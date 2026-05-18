#!/usr/bin/env node
/**
 * Walk every resource markdown file, extract the `url:` frontmatter,
 * verify each URL is reachable, and report problems.
 *
 * Strategy:
 *   - Try HEAD first; fall back to GET when HEAD returns non-2xx.
 *   - Use a browser-like User-Agent + Accept headers — many CDNs (Cloudflare,
 *     Akamai) block default fetch/curl/Node UAs from data-center IPs.
 *   - Retry once on a network error.
 *   - Classify outcomes:
 *       broken         = 4xx other than 403/429 (e.g. 404, 410, 400) → fails CI
 *       inconclusive   = 403 / 429              (bot-detection at edge) → warn only
 *       server-error   = 5xx                    (often transient)        → warn only
 *       network        = connection failure     (DNS/TLS/timeout/etc)    → warn only
 *
 *   Only `broken` fails the build; everything else is reported as a
 *   warning so we don't drown the report in CDN false-positives.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'src/content/resources';
const CONCURRENCY = 6;
const TIMEOUT_MS = 20000;
const RETRY_BACKOFF_MS = 2000;

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const COMMON_HEADERS = {
  'User-Agent': UA,
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function extractField(md, field) {
  const match = md.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

async function fetchOnce(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: COMMON_HEADERS,
    });
    // Drain body to release the socket (some servers hang otherwise).
    if (method === 'GET') {
      try {
        await res.arrayBuffer();
      } catch {
        /* ignore body drain errors */
      }
    }
    return { status: res.status };
  } finally {
    clearTimeout(timer);
  }
}

function classify(status) {
  if (status >= 200 && status < 400) return 'ok';
  if (status === 403 || status === 429) return 'inconclusive';
  if (status >= 500) return 'server-error';
  return 'broken';
}

async function checkOne(url) {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      // Try HEAD first (cheap), then GET if HEAD says non-2xx/3xx.
      let res = await fetchOnce(url, 'HEAD');
      if (res.status >= 400) {
        res = await fetchOnce(url, 'GET');
      }
      const kind = classify(res.status);
      return { ok: kind === 'ok', status: res.status, kind };
    } catch (err) {
      lastError = err.message || String(err);
      if (attempt === 0) await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS));
    }
  }
  return { ok: false, status: 0, kind: 'network', error: lastError };
}

async function pool(items, worker, size) {
  const results = [];
  const queue = [...items.entries()];
  const runners = Array.from({ length: size }, async () => {
    while (queue.length) {
      const [idx, item] = queue.shift();
      results[idx] = await worker(item);
    }
  });
  await Promise.all(runners);
  return results;
}

const files = await walk(ROOT);
const entries = await Promise.all(
  files.map(async (file) => {
    const md = await readFile(file, 'utf8');
    return { file, name: extractField(md, 'name'), url: extractField(md, 'url') };
  }),
);

const valid = entries.filter((e) => e.url);

console.log(`Checking ${valid.length} URLs across ${files.length} resource files…\n`);

const results = await pool(
  valid,
  async (e) => ({ ...e, result: await checkOne(e.url) }),
  CONCURRENCY,
);

const buckets = { ok: [], broken: [], inconclusive: [], 'server-error': [], network: [] };
for (const r of results) buckets[r.result.kind].push(r);

const counts = Object.fromEntries(
  Object.entries(buckets).map(([k, v]) => [k, v.length]),
);

console.log(`OK:           ${counts.ok}`);
console.log(`Broken:       ${counts.broken}        (fails CI)`);
console.log(`Inconclusive: ${counts.inconclusive}  (403/429 — likely bot-blocked)`);
console.log(`Server error: ${counts['server-error']}        (5xx — likely transient)`);
console.log(`Network:      ${counts.network}       (DNS/TLS/timeout — likely transient)`);
console.log('');

function printGroup(label, list) {
  if (!list.length) return;
  console.log(`${label}:`);
  for (const b of list) {
    const status = b.result.status || 'ERR';
    const err = b.result.error ? `  ${b.result.error}` : '';
    console.log(`  · ${b.name} (${b.url}) → ${status}${err}`);
  }
  console.log('');
}

printGroup('Broken (CI failure)', buckets.broken);
printGroup('Inconclusive (warning)', buckets.inconclusive);
printGroup('Server error (warning)', buckets['server-error']);
printGroup('Network error (warning)', buckets.network);

const reportable = [
  ...buckets.broken,
  ...buckets.inconclusive,
  ...buckets['server-error'],
  ...buckets.network,
];

if (reportable.length) {
  await writeFile(
    'broken-links.json',
    JSON.stringify(
      reportable.map((b) => ({
        file: b.file,
        name: b.name,
        url: b.url,
        kind: b.result.kind,
        status: b.result.status,
        error: b.result.error,
      })),
      null,
      2,
    ),
  );
}

if (buckets.broken.length) process.exit(1);

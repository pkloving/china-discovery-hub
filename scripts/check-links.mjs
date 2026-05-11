#!/usr/bin/env node
/**
 * Walk every resource markdown file, extract the `url:` frontmatter,
 * hit each URL with HEAD (then GET fallback), and report broken links.
 * Exit 1 if any link fails so CI flags the run.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'src/content/resources';
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

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

function extractUrl(md) {
  const match = md.match(/^url:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

function extractName(md) {
  const match = md.match(/^name:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

async function checkOne(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'china-discovery-hub-linkcheck/1.0' },
    });
    if (res.status === 405 || res.status === 403) {
      // Some sites reject HEAD; retry GET
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'china-discovery-hub-linkcheck/1.0' },
      });
    }
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  } finally {
    clearTimeout(timer);
  }
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
    return { file, name: extractName(md), url: extractUrl(md) };
  }),
);

const valid = entries.filter((e) => e.url);

console.log(`Checking ${valid.length} URLs across ${files.length} resource files…\n`);

const results = await pool(valid, async (e) => ({ ...e, result: await checkOne(e.url) }), CONCURRENCY);

const broken = results.filter((r) => !r.result.ok);
const ok = results.length - broken.length;

console.log(`✅ OK:     ${ok}`);
console.log(`❌ Broken: ${broken.length}\n`);

if (broken.length) {
  console.log('Broken links:');
  for (const b of broken) {
    console.log(`  · ${b.name} (${b.url}) → ${b.result.status} ${b.result.error ?? ''}`);
  }
  await writeFile(
    'broken-links.json',
    JSON.stringify(
      broken.map((b) => ({ file: b.file, name: b.name, url: b.url, status: b.result.status, error: b.result.error })),
      null,
      2,
    ),
  );
  process.exit(1);
}

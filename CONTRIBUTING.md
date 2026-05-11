# Contributing to China Discovery Hub

Thanks for considering a contribution! This project lives or dies on the
quality of its curation. Everything here is a public good — content under
MIT license, site code open-source.

## What we list

The bar is **"would a busy friend thank you for this single link?"**. We list:

- ✅ Apps, websites, podcasts, YouTube channels, communities, museums, official portals
- ✅ Resources that are accessible to non-Chinese-speaking audiences
  (or clearly flagged when they're not)
- ✅ Things that have been around at least 6 months and are actively maintained

We don't list:

- ❌ Walled gardens, private Discords, paid-only platforms without a free trial
- ❌ Pure aggregators with no original content
- ❌ Politically partisan content (from any direction)
- ❌ NSFW, crypto, gambling, MLM, conspiracy content
- ❌ Promotional listings (we don't take paid placements)

## How to add a resource

### Option 1 — via GitHub issue (no coding required)

Open a [new resource issue](../../issues/new?template=new-resource.yml).
Fill in the form. Editorial team will review and add it within ~72 hours.

### Option 2 — via Pull Request (recommended for contributors)

1. **Fork & clone** this repo.
2. **Install deps:** `pnpm install` (requires Node 20+ and pnpm 10+)
3. **Create a markdown file** under the right category folder:
   ```
   src/content/resources/<category-slug>/<resource-slug>.md
   ```
4. **Copy this frontmatter template** and fill it in:

   ```markdown
   ---
   name: Resource Name
   url: https://example.com/
   description: 1-2 sentences, max 220 chars. What it is + what makes it good.
   category: learn-chinese  # see config.ts for valid values
   subTags: [tag-one, tag-two]
   languagesSupported: [en, zh]
   pricing: free  # or 'freemium' or 'paid'
   featured: false  # editors only
   accessibleOutsideChina: true
   requiresVpnFromChina: false
   addedDate: 2026-05-11
   submittedBy: your-github-handle
   ---

   1-2 paragraphs of context. Why is this resource worth listing? What kind
   of user is it for? What's its specific strength relative to others in
   the same niche?
   ```

5. **Validate locally:**
   ```bash
   pnpm check     # type-check + Zod schema validation
   pnpm build     # full build + Pagefind index
   ```
6. **Open a PR.** CI will re-run validation and build a preview.

The Zod schema in `src/content/config.ts` enforces required fields; if you
miss something, `pnpm check` will tell you exactly which line and field.

## How the site is built

- **Astro 5** as the static site generator (no JS shipped by default)
- **Tailwind CSS 3** for styling
- **Markdown + Content Collections** for everything you can edit
- **Pagefind** for static, no-backend search
- **Cloudflare Pages** for hosting

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design rationale.

## Editorial principles

1. **Cultural first, political second.** We don't take sides on geopolitics.
2. **Quality before quantity.** Every entry must be something a busy friend
   would thank you for.
3. **Accessible to outsiders.** If a resource requires fluent Mandarin or a
   Chinese mobile number, flag that clearly.
4. **No paid placement.** Featured slots are editorial. If this ever changes
   it will be labeled prominently and tracked in a public ledger.
5. **Open source.** Site code MIT-licensed, content CC-BY-4.0 (by submission
   you agree to this licensing).

## Code of conduct

Be kind. Disagreements about cuisine, dialect, traditional/simplified, or
which Wong Kar-wai film is best — welcome. Personal attacks — not.

## Questions

Open a [Discussion](../../discussions) or DM @editorial in PR comments.

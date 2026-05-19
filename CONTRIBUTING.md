# Suggesting to China Discovery Hub

This is a personal editorial project. The site source is public on GitHub
for transparency, but every entry passes through one set of editorial
hands. I read every suggestion that comes in.

**Pull requests aren't merged.** What works instead: opening an Issue, or
using the submit form on the site.

## What gets listed

The bar is **"would a busy friend thank you for this single link?"**:

- ✅ Apps, websites, podcasts, YouTube channels, communities, museums, official portals
- ✅ Resources accessible to non-Chinese-speaking audiences (or clearly flagged when they're not)
- ✅ Things that have been around at least 6 months and are actively maintained

What doesn't:

- ❌ Walled gardens, private Discords, paid-only platforms without a preview
- ❌ Pure aggregators with no original content
- ❌ Politically partisan content (from any direction)
- ❌ NSFW, crypto, gambling, MLM, conspiracy content
- ❌ Self-promotional listings without editorial value

## How to suggest a resource

Pick one:

1. **The submit form** at [chinahub.cc/submit](https://chinahub.cc/submit) —
   takes two minutes, no GitHub account needed.
2. **A GitHub Issue** at
   [pkloving/china-discovery-hub/issues](https://github.com/pkloving/china-discovery-hub/issues) —
   include the URL, suggested category, and one or two sentences on why
   it's worth listing.

Either way: I read every one, reply if you leave an email, and either
add the resource or politely explain why it doesn't fit.

## How to report a broken link or factual error

Same channels as above. A GitHub Issue with the URL of the affected entry
and what's wrong is the fastest path.

## How the site is built

For the curious:

- **Astro 5** static site generator (zero JS on most pages)
- **Tailwind CSS 3** for styling
- **Markdown + Content Collections** for every resource and essay
- **Pagefind** for in-browser search (no backend)
- **Cloudflare Pages** for hosting

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design rationale.

## Editorial principles

1. **Cultural first, political second.** No sides on geopolitics.
2. **Quality before quantity.** Every entry must earn its slot.
3. **Accessible to outsiders.** Flag when a resource needs fluent Mandarin
   or a Chinese phone number.
4. **Editorial picks are not advertisements.** If any affiliate links or
   sponsored slots appear in future, they'll be clearly labeled and
   never disguised as editorial.
5. **Source open, decisions personal.** The code and content are public on
   GitHub; the editorial calls are made by one person.

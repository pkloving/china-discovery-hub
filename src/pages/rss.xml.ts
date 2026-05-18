import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllResources, getAllCategories } from '../lib/getResources';

export async function GET(context: APIContext) {
  const resources = (await getAllResources()).slice(0, 50);
  const categories = await getAllCategories();
  const catName = new Map(categories.map((c) => [c.slug, c.data.name]));

  return rss({
    title: 'China Discovery Hub — Latest resources',
    description:
      'Newly added picks to discover China — language, culture, food, travel, business and more.',
    site: context.site ?? 'https://chinahub.cc',
    items: resources.map((r) => ({
      title: r.data.name,
      link: r.data.url,
      pubDate: r.data.addedDate,
      description: r.data.description,
      categories: [catName.get(r.data.category) ?? r.data.category, ...r.data.subTags],
    })),
    customData: '<language>en</language>',
    stylesheet: false,
  });
}

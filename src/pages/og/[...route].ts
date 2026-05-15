import { OGImageRoute } from 'astro-og-canvas';
import { getAllCategories } from '../../lib/getResources';

const categories = await getAllCategories();

const staticPages: Record<string, { title: string; description: string }> = {
  index: {
    title: 'China Discovery Hub',
    description:
      'A curated directory of the best resources to discover China — language, culture, food, travel, business, and beyond.',
  },
  about: {
    title: 'About',
    description: 'Why China Discovery Hub exists and how it works.',
  },
  featured: {
    title: 'Featured Resources',
    description: "Editors' picks — hand-selected entries worth your time.",
  },
  search: {
    title: 'Search',
    description: 'Find resources across the directory.',
  },
  submit: {
    title: 'Submit a Resource',
    description: 'Recommend something we should add — via form or GitHub PR.',
  },
};

const categoryPages = Object.fromEntries(
  categories.map((c) => [
    `category/${c.slug}`,
    {
      title: c.data.name,
      description: c.data.tagline,
    },
  ]),
);

const pages = { ...staticPages, ...categoryPages };

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [250, 250, 247],
      [242, 240, 234],
    ],
    border: {
      color: [157, 41, 51],
      width: 14,
      side: 'inline-start',
    },
    padding: 80,
    font: {
      title: {
        size: 82,
        families: ['Inter', 'sans-serif'],
        weight: 'Bold',
        color: [31, 35, 41],
        lineHeight: 1.15,
      },
      description: {
        size: 34,
        families: ['Inter', 'sans-serif'],
        weight: 'Normal',
        color: [80, 75, 70],
        lineHeight: 1.45,
      },
    },
  }),
});

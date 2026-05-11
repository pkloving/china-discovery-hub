import { defineCollection, z } from 'astro:content';

export const CATEGORY_SLUGS = [
  'learn-chinese',
  'culture',
  'food',
  'travel',
  'living',
  'apps',
  'entertainment',
  'business',
  'media',
  'diaspora',
  'subculture',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().max(80),
    url: z.string().url(),
    description: z.string().max(220),
    descriptionZh: z.string().max(140).optional(),
    category: z.enum(CATEGORY_SLUGS),
    subTags: z.array(z.string()).default([]),
    languagesSupported: z
      .array(z.enum(['en', 'zh', 'ja', 'ko', 'es', 'fr', 'ar', 'ru', 'de', 'pt']))
      .default(['en']),
    pricing: z.enum(['free', 'freemium', 'paid']).default('free'),
    featured: z.boolean().default(false),
    accessibleOutsideChina: z.boolean().default(true),
    requiresVpnFromChina: z.boolean().default(false),
    addedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    submittedBy: z.string().optional(),
    favicon: z.string().optional(),
    screenshot: z.string().optional(),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameZh: z.string(),
    emoji: z.string(),
    order: z.number(),
    tagline: z.string(),
    description: z.string(),
    subTags: z
      .array(z.object({ slug: z.string(), label: z.string() }))
      .default([]),
  }),
});

export const collections = { resources, categories };

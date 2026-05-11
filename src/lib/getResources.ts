import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategorySlug } from '../content/config';

export async function getAllResources() {
  const all = await getCollection('resources');
  return all.sort((a, b) => +b.data.addedDate - +a.data.addedDate);
}

export async function getResourcesByCategory(slug: CategorySlug) {
  const all = await getAllResources();
  return all.filter((r) => r.data.category === slug);
}

export async function getFeaturedResources(limit = 6) {
  const all = await getAllResources();
  return all.filter((r) => r.data.featured).slice(0, limit);
}

export async function getLatestResources(limit = 10) {
  const all = await getAllResources();
  return all.slice(0, limit);
}

export async function getAllCategories() {
  const categories = await getCollection('categories');
  return categories.sort((a, b) => a.data.order - b.data.order);
}

export async function getCategory(slug: CategorySlug) {
  const all = await getAllCategories();
  return all.find((c) => c.slug === slug);
}

export async function getCategoryCounts() {
  const all = await getAllResources();
  const counts: Record<string, number> = {};
  for (const r of all) {
    counts[r.data.category] = (counts[r.data.category] ?? 0) + 1;
  }
  return counts;
}

export type ResourceEntry = CollectionEntry<'resources'>;
export type CategoryEntry = CollectionEntry<'categories'>;

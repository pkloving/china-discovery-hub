import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://0ba56a1d-china-discovery-hub.pkloving.workers.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    mdx(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', // replace with your actual site URL
  server: { open: import.meta.env.DEV, host: import.meta.env.DEV },
  integrations: [react(), sitemap()]
});
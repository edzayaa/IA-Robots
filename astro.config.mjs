// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  server: { open: import.meta.env.DEV, host: true},
  integrations: [react()]
});
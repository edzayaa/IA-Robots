// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    server: { open: import.meta.env.DEV, host: import.meta.env.DEV }
});

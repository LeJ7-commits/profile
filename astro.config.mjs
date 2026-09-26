// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site. When a custom domain is added (public/CNAME),
// set SITE_URL to it and BASE_PATH to "/" in the deploy workflow.
const site = process.env.SITE_URL ?? 'https://lej7-commits.github.io';
const base = process.env.BASE_PATH ?? '/profile';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});

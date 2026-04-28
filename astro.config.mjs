import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yeounil.github.io',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

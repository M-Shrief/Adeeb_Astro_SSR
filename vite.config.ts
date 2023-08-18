// This needed for Cypress component testing, but not required for development & production 
// Because Astro use vite and provide configs for it in astro.config.mjs
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});

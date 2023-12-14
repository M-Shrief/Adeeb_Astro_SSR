import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://adeeb.m-shrief.tech',
  integrations: [
    vue({
      // appEntrypoint: '/src/pages/_app' 
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      entryLimit: 100
    })
  ],
  server: {
    port: 5173,
    host: "0.0.0.0"
  },
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport'
  },
  vite: {
    ssr: {
      // Users with strict package installations need to manually install these themselves if they use the related features.
      external: [
        'sharp', // For sharp image service
      ]    
    },
  },
});
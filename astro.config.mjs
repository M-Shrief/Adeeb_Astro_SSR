import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://adeeb.m-shrief.tech',
  integrations: [
    vue({
      // appEntrypoint: '/src/pages/_app' 
    }),
    prefetch({
      selector: ["a[href^='/ordering']", "a[href^='/partners/ordering']"],
      throttle: 1
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      entryLimit: 100
    })
  ],
  server: {
    port: 5173
  },
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
  // vite: {
  //   ssr: {
  //     noExternal: ['path-to-regexp'],
  //   },
  // },
});
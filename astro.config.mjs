import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
// import node from "@astrojs/node";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [vue({
    // appEntrypoint: '/src/pages/_app' 
  })],
  server: {
    port: 5173
  },
  output: "hybrid",
  adapter: cloudflare(),
  // adapter: node({
  //   mode: "standalone"
  // }),
  // vite: {
  //   ssr: {
  //     noExternal: ['path-to-regexp'],
  //   },
  // },
});
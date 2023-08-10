import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      // appEntrypoint: '/src/pages/_app' 
    })
  ],
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});
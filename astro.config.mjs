import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
    // appEntrypoint: '/src/pages/_app' 
    })
  ],
  server: {
    port: 5173
  },
  output: "hybrid",
  adapter: cloudflare()
});
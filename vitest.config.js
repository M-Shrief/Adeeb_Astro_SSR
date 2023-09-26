import { getViteConfig } from 'astro/config';
import vue from '@vitejs/plugin-vue';

export default getViteConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [vue()],
  test: {
  
    // Vitest configuration options
    includeSource: [  
      'src/stores/*.{js,ts}', // in-source Unit testing 
      'src/components/*.spec.{js,ts}' // Component testing
    ],
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  },
});
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    // Vitest configuration options
    includeSource: ['src/stores/*.{js,ts}'],
    globals: true,
  },
});
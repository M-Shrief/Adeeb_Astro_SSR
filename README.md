# "Adeeb أديب"'s SSR frontned with TypeScript, Astro & Vuejs

Overview: It's concerned with Arabic literature. It assumes a business model that enables you to order a specific piece of literature to be printed with especial colors and font. Then it'll be delivered to the customer, with the ability for the customer to follow up the process. And for special customers, it provides them with the ability to make bulk orders fast and easy. And if they’re willing to signup, they can review all of their past orders.

The project's goal is to migrate "Adeeb اديب"'s [SPA frontend](https://github.com/M-Shrief/Adeeb_Vue_TS "repo") to render as SSR with **Astro**.

- Tech Stack:


  - Full **TypeScript**
  - **HTML, CSS & SCSS**
  - **Vite**
  - **Vuejs**
  - **Astro**
  
- Characteristics:

  - form validation with Vee-validate & Yup
  - JWT authentication and authorization
  - Dark/Light Theme
  - Component testing with Cypress
  - ... and more

**Overview, and file structure**:

- _./assets_ for our base.css and mixins.scss

- _./components_ for our reusable Vuejs components across the app.

- _./composables_ for Vuejs composables.

- _./pages_ every pages defines a route and what it should render.

- _./clientPages_ full Vuejs pages that goes for full reactivity when rendered and doesn't need to be searchable or SEO optimized.

- _./stores_ for to manage our app state, logic and api requests, while
  leveraging its reactivity with @vue/reactivity package.

- _./utils_ shared utilities across the app

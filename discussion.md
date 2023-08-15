Ht, I want to recommend @vue/reactivity package as another way to manage state with Astro:

- It's size is 14.4 Kb (nanostores is 5.4 KB)
- It's tree-shakeable
- maintained by Vuejs' core Team.

package's links:

- [github](https://github.com/vuejs/core/blob/main/packages/reactivity/src/index.ts)
- [npm](https://www.npmjs.com/package/@vue/reactivity)

**It has very neat & simple interface**:

- **[ref()](https://vuejs.org/api/reactivity-core.html#ref)**: Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures like Map. A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays.
- **[shallowRef()](https://vuejs.org/api/reactivity-advanced.html#shallowref)**: the inner value of a shallow ref is stored and exposed as-is, and will not be made deeply reactive. Only the .value access is reactive. shallowRef() is typically used for performance optimizations of large data structures, or integration with external state management systems.
- **[reactive()](https://vuejs.org/api/reactivity-core.html#reactive)**: Unlike a ref which wraps the inner value in a special object, reactive() makes an object itself reactive, it's a proxy of the original object, and mutating the original object will no trigger an update
- **[shallowReactive()](https://vuejs.org/api/reactivity-advanced.html#shallowreactive)**: Unlike reactive(), there is no deep conversion: only root-level properties are reactive for a shallow reactive object. Property values are stored and exposed as-is.
- **[computed()](https://vuejs.org/api/reactivity-core.html#computed)** for complex logic that includes reactive data, computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed.
- and more like [readonly()](https://vuejs.org/api/reactivity-core.html#readonly)

**To install:**

```bash
npm i @vue/reactivity
```

**Examples:**

```ts
// TypeScript file, typically in src/stores/
import { ref, computed } from "@vue/reactivity";

// Declaring a reactive variable
const poets = ref<Poet[]>([]);
// Accessing its value
console.log(poets.value);
// Mutating its value
poets.value = [...newPoets];

// using computed to as a getter or to get a modification of the reactive variable
export const getPoets = computed<Poet[]>(() => {
  return poets.value;
});

const counter = ref(2);
const getDoubleCounter = computed(() => {
  return counter.value * 2;
});

// for actions, just use sync/async functions
export const fetchPoets = async () => {
  try {
    const req = await baseHttp.get(`/poets`);
    poets.value = req.data;
  } catch (error) {
    alert(error);
  }
};
```

Then in .astro file:

```astro
---
// Layout
import Layout from "../layouts/Layout.astro";
// Components
import ShowCasePoets from "../components/ShowCasePoets.vue";
// Stores
import { getPoets, fetchPoets } from "../stores/poets.composition";

// fetching poets on build
await fetchPoets();
---

<Layout>
  <main>
    <!-- then we can pass the value to components -->
    <ShowCasePoets poets={getPoets.value} />
  </main>
</Layout>
```

I'm currently migrating my Vuejs SPA to Astro, I'm using @vue/reactivity & nanostores, I can use them exchangeably with ease. I made two examples of the same store (src/stores/poets.composition.ts with @vue/reactivity, src/stores/poets.nano.ts for nanostores)

Some perceivable benefits of applying this recommendation:

- Showing Astro's versatility to use already made packages in the ecosystem.
- Inspiring other developers from other ecosystems to integrate their ecosystem with astro, and showing that they can go as minimal with packages like @vue/reactivity or go big with state management libraries like Pinia, and all of that is done easily with Astro.
- Hopefully, it'll help to Increase Astro's share in the SSR market.

PS: that's my first discussion, and I'm a junior, so I hope I've done it well, so take my words with a grain of salt.

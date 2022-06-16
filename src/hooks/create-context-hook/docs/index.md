# Create Context Hook
创建一个 context hook, 返回 `{ provideContext, injectContext }` 而不必指定 key

## Usage
建议在一个独立的文件导出  `{ provideContext, injectContext }`，随后在根组件中 `provideContext()`，在子组件中`injectContext()` 消费 context。

```ts
// context.ts

export interface Context {
  // ...
}
export const { provideContext, injectContext } = createContextHook<Context>('context')
```

```vue
<script lang='ts'>
// root.vue

import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'Root',
  setup(props) {
    provideContext({ controlers })
  },
})
</script>
```


```vue
<script lang='ts'>
// child.vue

import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'Child',
  setup(props) {
    const context = injectContext()
  },
})
</script>
```
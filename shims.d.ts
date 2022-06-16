/// <referrence type="vitest/client" />

declare module '*.vue' {
  import type { defineComponent } from 'vue-demi'
  type Component = ReturnType<typeof defineComponent>
  const component: Component
  export default component
}

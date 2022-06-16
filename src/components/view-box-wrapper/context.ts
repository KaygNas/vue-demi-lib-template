import { createContextHook } from 'template-name/hooks'
import type { ComputedRef, Ref } from 'vue-demi'
import type { ViewBox } from './interface'

export interface Context {
  viewPort: ComputedRef<ViewBox> | Ref<ViewBox>
}

export const { provideContext, injectContext } = createContextHook<Context>()

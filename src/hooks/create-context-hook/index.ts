import {
  inject,
  provide,
} from 'vue-demi'

export const createContextHook = <Context>(label = 'contextKey') => {
  const CONTEXT_KEY = Symbol(label)

  const provideContext = (c: Context) => provide(CONTEXT_KEY, c)
  const injectContext = () => inject<Context>(CONTEXT_KEY)
  return { provideContext, injectContext }
}

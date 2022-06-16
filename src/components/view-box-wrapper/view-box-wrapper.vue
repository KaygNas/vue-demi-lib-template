<script lang="ts">
import type { PropType } from 'vue-demi'
import { computed, defineComponent } from 'vue-demi'
import { injectContext, provideContext } from './context'
import type { AlternativeViewBox } from './interface'
import { adaptToViewBox } from './utils'

const calcPercentage = (a: number, b: number) => {
  if (b === 0)
    return '0%'
  return `${(a / b) * 100}%`
}

export default defineComponent({
  props: {
    viewBox: {
      type: Object as PropType<AlternativeViewBox>,
      required: true,
    },
    clickable: {
      type: Boolean,
    },
  },
  setup(props) {
    const context = injectContext()
    const _viewBox = computed(() => adaptToViewBox(props.viewBox))

    provideContext({
      viewPort: _viewBox,
    })

    const wrapperStyle = computed<any>(() => {
      if (!context?.viewPort) {
        return {
          position: 'relative',
        }
      }

      const viewBox = _viewBox.value
      const _viewPort = context.viewPort.value
      return {
        position: 'absolute',
        left: calcPercentage(viewBox.x, _viewPort.width),
        top: calcPercentage(viewBox.y, _viewPort.height),
        width: calcPercentage(viewBox.width, _viewPort.width),
        height: calcPercentage(viewBox.height, _viewPort.height),
      }
    })

    return { wrapperStyle }
  },
})
</script>

<template>
  <div
    class="view-box-wrapper"
    :class="{
      clickable,
    }"
    :style="wrapperStyle"
  >
    <slot />
  </div>
</template>

<style lang="less">
.view-box-wrapper{
 .clickable {
  cursor: pointer;
 }
}
</style>

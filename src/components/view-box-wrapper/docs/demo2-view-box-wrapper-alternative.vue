<script lang='ts' setup>
import { ViewBoxWrapper } from 'template-name'
import type { AlternativeViewBox } from 'template-name/components/view-box-wrapper'
import type { StyleValue } from 'vue'
import { computed, ref } from 'vue'
const viewPort: AlternativeViewBox = {
  left: 0,
  top: 0,
  width: 100,
  height: 100,
}
const itemViewBox: AlternativeViewBox = [[10, 10], [60, 10], [60, 60], [10, 60]]
const scale = ref(0)
const marks = {
  0: '0%',
  100: '100%',
}
const parentViewBoxSize = computed<StyleValue>(() => {
  return {
    width: `${viewPort.width * 2 * (1 + scale.value / 100)}px`,
    height: `${viewPort.height * 2 * (1 + scale.value / 100)}px`,
  }
})
</script>

<template>
  <view-box-wrapper
    :view-box="viewPort"
    style="background-color: pink;"
    :style="parentViewBoxSize"
  >
    <view-box-wrapper
      :view-box="itemViewBox"
      style="background-color: green;"
    />
  </view-box-wrapper>
  <a-slider v-model:value="scale" :marks="marks" />
</template>

<style lang="scss"></style>

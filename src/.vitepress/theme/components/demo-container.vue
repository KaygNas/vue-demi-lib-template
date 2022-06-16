<script lang='ts' setup>
import { ref } from 'vue'
import { ExpandOutlined } from '@ant-design/icons-vue'
import { Card as ACard, Tooltip as ATooltip } from 'ant-design-vue'
const props = defineProps<{
  name: string
  code: string
}>()
// markdown plugin 将 code 以 URI encoded 传入，解码后作为 html 直接使用即可
const codeHtml = props.code
const codeVisible = ref(false)
function toggleCodeVisible() {
  codeVisible.value = !codeVisible.value
}
</script>

<template>
  <ACard :id="name" class="demo-container" v-bind="$attrs">
    <template #title>
      <div class="demo-name">
        {{ name }}
        <a class="demo-name-anchor" :href="`#${name}`" aria-hidden="true">#</a>
      </div>
    </template>
    <slot />
    <template #actions>
      <div @click="toggleCodeVisible">
        <ATooltip placement="top">
          <template #title>
            <span>查看代码</span>
          </template>
          <expand-outlined />
        </ATooltip>
        <div v-show="codeVisible" class="code-wrapper" @click.stop>
          <div v-html="codeHtml" />
        </div>
      </div>
    </template>
  </ACard>
</template>

<style scoped>
.demo-container{
  margin-bottom:24px;
}
.code-wrapper{
  margin-top:12px;
}
.demo-name:hover .demo-name-anchor{
  opacity:1;
}
.demo-name-anchor{
  opacity:0;
}
</style>

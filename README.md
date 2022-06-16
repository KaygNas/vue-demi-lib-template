# Vue-demi Lib Template 
本项目是一个能够同时兼容 vue2/vue3 的组件库的模板。

## Feature 
### 一次编写，同时在 vue2/vue3 使用
感谢 [vue-demi][vue-demi-site] 的出现，让开发者可以编写一次组件，就可以在 vue2/3 的项目中同时使用。

配合 [rollup-plugin-vue-demi][rollup-plugin-vue-demi-site] 的插件，你甚至可以将 sfc 文件同时构建成 vue2/3 版本。


### 自动生成的文档网站
基于 [vite-press][vite-press-site] 的静态网站生成能力，再辅以插件，可以让你的库有更良好组织的文档。  

文档的目录组织需要遵循以下规则:
1. 组件目录下必须存在 docs 文件夹，且文件夹内必须存在 index.md 文件
2. 若 docs 目录下存在以 `demo*.vue` 命名的 sfc，那么它会作为 demo 插入到文档的末尾

你可以参考本模板的 `src/components/view-box-wrapper` 是如何组织文件的。

## Scripts 

### 库构建 `npm run build`
### 文档网站开发预览 `npm run dev` 
### 文档网站构建 `npm run docs:build` 
### 文档网站构建产物预览 `npm run docs:serve` 


[vue-demi-site]: https://github.com/vueuse/vue-demi
[rollup-plugin-vue-demi-site]: https://github.com/KaygNas/rollup-plugin-vue-demi
[vite-press-site]: https://vitepress.vuejs.org/
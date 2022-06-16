/**
 * vitepress 的配置文件，必须放置在对应的根目录
 */

import path from 'path'
import { defineConfig } from 'vite'
import { MarkdownTransform } from './.vitepress/plugins'

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^template-name/, replacement: path.resolve(__dirname, './') }],
  },
  plugins: [
    MarkdownTransform(),
  ],
  server: {
    port: 9988,
  },

})

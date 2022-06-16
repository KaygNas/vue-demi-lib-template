import path from 'path'
import { defineConfig } from 'vitest/config'

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
      { find: /^template-name/, replacement: path.resolve(__dirname, './src') }],
  },
  test: {
    environment: 'jsdom',
  },
})

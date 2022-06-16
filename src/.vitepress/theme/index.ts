import DefaultTheme from 'vitepress/theme'
import Antdv from 'ant-design-vue'
import type { Theme } from 'vitepress'
import { DemoContainer } from './components'
import 'ant-design-vue/dist/antd.css'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.use(Antdv)
    app.component('DemoContainer', DemoContainer)
  },
}

export default theme

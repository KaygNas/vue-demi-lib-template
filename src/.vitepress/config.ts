import { join } from 'path'
import { defineConfigWithTheme } from 'vitepress'
import { flow, groupBy } from 'lodash'
import fg from 'fast-glob'
import pkg from '../../package.json'
const logoUrl = '/logo.png'
export type SideBarItem = SideBarLink | SideBarGroup

export interface SideBarLink {
  text: string
  link: string
}

export interface SideBarGroup {
  text: string
  link?: string

  /**
     * @default false
   */
  collapsable?: boolean

  children: SideBarItem[]
}

const config = defineConfigWithTheme({
  title: pkg.name,
  description: 'TODO',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    logo: logoUrl,
    nav: [
      { text: 'homepage', link: pkg.homepage },
    ],
    sidebar: {
      '/': createSideBar(),
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: logoUrl, type: 'image/png' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' }],
  ],
})

function createSideBar() {
  // 读取所有带有 index.md 文档的目录
  const dirs = fg.sync('*/**/docs/index.md', {
    cwd: join(__dirname, '../'),
  })
  // 按照一级目录聚合
  const group = (dirs: string[]) => groupBy(dirs, dir => dir.split('/')[0])

  // 将每个目录下的文件转换成 SiderBarItem
  const transform = (dirs: Record<string, string[]>) => Object.entries(dirs)
    .map<SideBarItem>(([pkgName, dir]) => {
    const children = dir.map<SideBarItem>((dirname) => {
      const rootdir = dirname.replace('/docs/index.md', '')
      const [, text] = rootdir.split('/')
      return {
        text,
        link: dirname.replace('.md', ''),
      }
    })
    return {
      text: pkgName,
      children,
    }
  })

  const sideBar = flow(group, transform)(dirs)
  return sideBar
}

export default config

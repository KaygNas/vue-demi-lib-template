import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'
import type { Plugin } from 'vite'
import fg from 'fast-glob'
import { camelCase, upperFirst } from 'lodash'
import { createMarkdownRenderer } from 'vitepress'
import escapeHtml from 'escape-html'

export function MarkdownTransform(): Plugin {
  return {
    name: 'markdown-transform',
    async transform(code, id) {
      const paths = id.split('/')
      const filename = paths.slice(-1)[0]
      const dirpath = paths.slice(0, -1).join('/')
      if (filename === 'index.md') {
        const demoList = fg.sync(['demo*-*.vue'], {
          cwd: dirpath,
          onlyFiles: true,
        })
        if (demoList.length > 0)
          code = injectDemo(code, demoList, dirpath)
      }
      return code
    },
  }
}

function getFileName(filepath: string) {
  const paths = filepath.split('/')
  const filename = paths.slice(-1)[0]
  return filename
}

function injectDemo(code: string, demoList: string[], dirpath: string) {
  const _demoList = demoList.map((filepath) => {
    const filename = getFileName(filepath)
    return {
      name: upperFirst(camelCase(filename.replace(/^demo.*?-(.*)\.vue/, '$1'))),
      filepath: `./${filename}`,
      absoluteFilepath: path.join(dirpath, `./${filename}`),
    }
  })

  const importStatements = _demoList
    .map(({ name, filepath }) => {
      return `import ${name} from '${filepath}'`
    }).join('\n')

  const demoMarkdown = _demoList.map(({ name, absoluteFilepath }) => {
    const code = fs.readFileSync(absoluteFilepath, { encoding: 'utf-8' })
    const md = createMarkdownRenderer('', {}, '') as any
    const codeHtml = escapeHtml(Buffer.from(md.render(`\`\`\`vue\n${code}\n\`\`\``)).toString('utf-8'))
    return `
<DemoContainer name="${name}" code="${codeHtml}">
  <${name} />
</DemoContainer>
`
  }).join('\n')

  return `
  <script setup>
  ${importStatements}
  </script>

  ${code}

  ## Demo
  
  ${demoMarkdown}
  `
}

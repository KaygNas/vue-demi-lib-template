import { join, resolve } from 'path'
import type { Plugin } from 'rollup'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import { vueDemi } from 'rollup-plugin-vue-demi'
import { version } from 'vue-demi'
import styles from 'rollup-plugin-styles'
import alias from '@rollup/plugin-alias'
import fg from 'fast-glob'
import { getLibDir } from './utils'

const input = fg.sync(['**/index.ts'], {
  cwd: resolve(__dirname, '../src'),
  onlyFiles: true,
})
  .map(path => join(__dirname, '../src', path))

const externalList = [
  'vue-demi',
  'vue',
  'vue-runtime-helpers',
  'rollup-plugin-styles',
]

const config = defineConfig({
  input,
  output: [
    {
      dir: getLibDir(version),
      preserveModules: true,
      format: 'es',
    },
    {
      dir: getLibDir(version),
      preserveModules: true,
      entryFileNames: info => `${info.name}.cjs`,
      format: 'cjs',
      exports: 'auto',
    },
  ],
  plugins: [
    alias({
      entries: [
        {
          find: /^template-name(\/.*.ts)/,
          replacement: `${resolve(__dirname, '../src')}$1`,
        },
        {
          find: /^template-name(\/.*)?/,
          replacement: `${resolve(__dirname, '../src')}$1/index.ts`,
        },
      ],
    }),
    vueDemi({ isProduction: true }),
    styles({ mode: 'inject' }),
    externalizeImportInCss(),
    esbuild(),
  ],
  external: source => externalList.some(name => source.startsWith(name)),
  treeshake: true,
},
)

function externalizeImportInCss(): Plugin {
  return {
    name: 'externalizeImportInCss',
    transform(code, id) {
      const importStatement = /(import.*?from )('|").*node_modules\/(.*)('|")/
      const cssLangs = ['less', 'sass', 'scss', 'css']
      if (cssLangs.some(lang => id.includes(`.${lang}`))) {
        const replacedCode = code.replace(importStatement, '$1\'$3\'')
        return replacedCode
      }
      return code
    },
  }
}

export default config

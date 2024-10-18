import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { wrapperEnv } from './build/utils'
import pkg from './package.json'
import { createProxy } from './build/vite/proxy'

export default ({ command, mode }: ConfigEnv) => {
  const root: string = process.cwd()
  const env = loadEnv(mode, root)
  env.VITE_GLOB_APP_VERSION = `${pkg.version}`
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build'
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /^~\//,
          replacement: `${path.resolve(__dirname, 'src')}/`
        }
      ]
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or 'modern'
        }
      }
    },
    plugins: [
      react(),
      AutoImport({
        dirs: ['src/global', 'src/store'],
        imports: [
          {
            'lodash-es': ['debounce', 'omit']
          }
        ],
        dts: './src/auto-imports.d.ts'
      })
    ],
    esbuild: {
      drop: mode === 'production' ? (VITE_DROP_CONSOLE ? ['console', 'debugger'] : []) : []
    },
    build: {
      minify: 'esbuild',
      sourcemap: !isBuild // 是否生成sourcemap
    }
  })
}

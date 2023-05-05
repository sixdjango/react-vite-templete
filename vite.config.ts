import path from 'node:path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import { wrapperEnv } from './build/utils'
import pkg from './package.json'
import { createProxy } from './build/vite/proxy'

export default ({ command, mode }: ConfigEnv) => {
  const root: string = process.cwd()
  const env = loadEnv(mode, root)
  env.VITE_GLOB_APP_VERSION = `${pkg.version}`
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build'
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY, VITE_GLOB_USE_PWA } = viteEnv

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [{
        find: /^~\//,
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
      ],
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    plugins: [react(), Pages()],
  })
}

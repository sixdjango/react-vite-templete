import {viteExternalsPlugin} from 'vite-plugin-externals';


export function externalsPlugin(env: ViteEnv, isBuild: boolean) {
    return viteExternalsPlugin({
        // vue: 'Vue',
        gsap: 'gsap',
        'bignumber.js': 'BigNumber'
        // lazy: ['vue', 'lazy']
      })
}
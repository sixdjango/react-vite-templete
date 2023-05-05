/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { PluginOption } from 'vite';
import { createHtmlPlugin, } from 'vite-plugin-html';
import pkg from '../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  const tags: any[] = [];

  if(isBuild) {
    tags.push({
      tag: 'script',
      attrs: {
        src: getAppConfigSrc(),
      },
    },)

    tags.push({
        tag: 'script',
        attrs: {
          src: 'https://cdn.jsdelivr.net/npm/bignumber.js@9.1.0/bignumber.min.js',
        }
      })

  }

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    template: './index.html',
    inject: {
      // Inject data into ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // Embed the generated app.config.js file
      tags,
    },
  });
  return htmlPlugin;
}

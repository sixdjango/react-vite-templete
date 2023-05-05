/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant';
import { writeFileSync } from 'fs';
import chalk from 'chalk';

import { getEnvConfig, getRootPath } from '../utils';
import { getConfigFileName } from '../getConfigFileName';
import shell from 'shelljs';


import pkg from '../../package.json';

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
  try {
    const windowConf = `window.${configName}`;
    const date = new Date()
    config.VITE_GLOB_APP_VERSION += `.${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
    const {VITE_GLOB_APP_VERSION: shortVersion} = config
    // Ensure that the variable will not be modified
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');
    // fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);
    if (config.VITE_GLOB_OPEN_SENTRY === 'true') {
      const sentryProjectName = config.VITE_GLOB_SENTRY_PROJECT

      /** 创建release */
      shell.exec(`sentry-cli releases -p ${sentryProjectName} new @${shortVersion}`);

      /** 上传source map */
      const result = shell.exec(
        `sentry-cli releases -p ${sentryProjectName} files @${shortVersion} upload-sourcemaps './dist/assets'  --url-prefix '~/assets'`
      );
      console.log('code:', result.code);
      if (result.code !== 0) throw 'source map 上传失败!';
      const rmResult = shell.rm('-f', getRootPath('dist/assets/*.js.map'));

      if (rmResult.code !== 0) throw 'source map 删除失败!';
    }


    console.log(chalk.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(chalk.gray(OUTPUT_DIR + '/' + chalk.green(configFileName)) + '\n');
  } catch (error) {
    console.log(chalk.red('configuration file configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}

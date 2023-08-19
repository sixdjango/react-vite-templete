import type { GlobConfig, GlobEnvConfig } from '~/types/env'

import { isDevMode } from '~/configs/env'

function getGlobEnvConfig(): GlobEnvConfig {
  const env = import.meta.env
  return env as unknown as GlobEnvConfig
}

const reg = /[a-zA-Z\_]*/

function getShortName(env: any) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

const ENV_NAME = getShortName(import.meta.env)
const ENV = (isDevMode() ? getGlobEnvConfig() : window[ENV_NAME as any]) as unknown as GlobEnvConfig

const {
  VITE_GLOB_API_URL,
  VITE_GLOB_AI_API_URL,
  VITE_GLOB_APP_SHORT_NAME,
  VITE_GLOB_APP_VERSION,
  VITE_GLOB_PUBLIC_PATH,
  VITE_GLOB_API_URL_PREFIX,
  VITE_GLOB_OSS_URL,
  VITE_GLOB_PC_URL,
  VITE_GLOB_OPEN_AES_ENCRYPT,
  VITE_GLOB_OSS_REGION,
  VITE_GLOB_OSS_BUCKET,
  VITE_GLOB_OPEN_SENTRY,
  VITE_GLOB_SENTRY_DSN,
  VITE_GLOB_USE_PWA,
} = ENV

if (!reg.test(VITE_GLOB_APP_SHORT_NAME))
  console.warn('VITE_GLOB_APP_SHORT_NAME 变量只能是字符/下划线,请在环境变量中修改并重新运行。')

export function useGlobSetting(): Readonly<GlobConfig> {
  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: 'template',
    apiUrl: VITE_GLOB_API_URL,
    aiApiUrl: VITE_GLOB_AI_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    version: VITE_GLOB_APP_VERSION,
    publicPath: VITE_GLOB_PUBLIC_PATH,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    ossUrl: VITE_GLOB_OSS_URL,
    ossImageUrl: `${VITE_GLOB_OSS_URL}frontend/images/`,
    pcUrl: VITE_GLOB_PC_URL,
    openAesEncrypt: VITE_GLOB_OPEN_AES_ENCRYPT === 'true',
    ossRegion: VITE_GLOB_OSS_REGION,
    ossBucket: VITE_GLOB_OSS_BUCKET,
    openSentry: VITE_GLOB_OPEN_SENTRY === 'true',
    sentryDsn: VITE_GLOB_SENTRY_DSN,
    usePwa: VITE_GLOB_USE_PWA === 'true',
  }
  return glob as Readonly<GlobConfig>
}

export const globSetting = useGlobSetting()

// Generate cache key according to version
export function getStorageShortName() {
  useGlobSetting()
  return `${VITE_GLOB_APP_SHORT_NAME}__${import.meta.env.MODE}__`.toUpperCase()
}

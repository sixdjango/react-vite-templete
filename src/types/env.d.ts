export interface GlobConfig {
  // 网站标题
  title: string;

  apiUrl: string;

  aiApiUrl: string;

  urlPrefix?: string;

  shortName: string;

  version: string;

  publicPath: string;

  ossUrl: string;

  ossImageUrl: string;

  pcUrl: string;

  openAesEncrypt: boolean;

  ossRegion: string;

  ossBucket: string;

  openSentry: boolean;

  sentryDsn: string;

  usePwa: boolean;
}

export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string;

  VITE_GLOB_API_URL: string;
  
  VITE_GLOB_AI_API_URL:string;

  VITE_GLOB_API_URL_PREFIX?: string;

  VITE_GLOB_APP_SHORT_NAME: string;

  VITE_GLOB_APP_VERSION: string;

  VITE_GLOB_PUBLIC_PATH: string;

  VITE_GLOB_OSS_URL: string;

  VITE_GLOB_PC_URL: string;

  VITE_GLOB_OPEN_AES_ENCRYPT: string;

  VITE_GLOB_OSS_REGION: string;

  VITE_GLOB_OSS_BUCKET: string;

  VITE_GLOB_OPEN_SENTRY: string;

  VITE_GLOB_SENTRY_DSN: string;

  VITE_GLOB_USE_PWA: string
}

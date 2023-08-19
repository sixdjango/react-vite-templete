import type { GlobEnvConfig } from '~/types/env'

export function getGlobEnvConfig(): GlobEnvConfig {
  const env = import.meta.env
  return env as unknown as GlobEnvConfig
}

/**
 * @description: 开发模式
 */
export const devMode = 'development'

/**
 * @description: 测试模式
 */
export const testMode = 'test'

/**
 * @description: 生产模式
 */
export const prodMode = 'production'

export const inBrowser = typeof window !== 'undefined'

/**
 * @description: 获取环境变量
 * @param {type}
 * @returns:
 * @example:
 */
export const getEnv = (): string => import.meta.env.MODE

/**
 * @description: 是否是开发模式
 * @param {type}
 * @returns:
 * @example:
 */
export const isDevMode = (): boolean => import.meta.env.MODE === devMode

/**
 * 是否是预发环境
 * @returns
 */
export const isTestMode = (): boolean => import.meta.env.MODE === testMode

/**
 * @description: 是否是生产模式模式
 * @param {type}
 * @returns:
 * @example:
 */
export const isProdMode = (): boolean => import.meta.env.MODE === prodMode

/**
 * @description: 是否开启mock
 * @param {type}
 * @returns:
 * @example:
 */
export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true'

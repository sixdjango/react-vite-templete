import type { NiceAxiosPlugin } from 'nice-axios'

export const tokenPlugin: NiceAxiosPlugin = async (next, config) => {
  const token = 'token'
  // jwt token
  config.headers!.Authorization = token

  return next()
}

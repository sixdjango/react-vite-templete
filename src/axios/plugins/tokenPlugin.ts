import type { AjaxPlugin } from 'nice-axios'

export const tokenPlugin: AjaxPlugin = async (next, config) => {
  const token = 'token'
  // jwt token
  config.headers!.Authorization = token

  return next()
}

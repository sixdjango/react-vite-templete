import { RoutePathEnum } from '~/constants/RoutePathEnum'
import { Middleware } from '../type'

/**
 * 判断是否有 token
 * @param to
 * @param next
 * @param options
 * @returns
 */
export const authMiddleware: Middleware = async (to, next, options = {}) => {
  const { token } = options
  return next().then(() => {
    if (to.meta?.auth && !token) {
      return Promise.reject({ type: 'error', redirect: RoutePathEnum.LOGIN })
    }
  })
}

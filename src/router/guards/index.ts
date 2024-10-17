import { useEffect, useRef, useState } from 'react'
import { Deferred } from '@yc-tech/shared'
import { useUserStore } from '~/store/userStore'
import { RoutePathEnum } from '~/constants/RoutePathEnum'
import { RouteConfig } from '../type'
export type UseGuardsOptions = {
  to: RouteConfig
  [key: string]: any
}

type Middleware = (
  to: RouteConfig,
  next: () => Promise<any>,
  options?: {
    token?: string
  }
) => Promise<any>

const authMiddleware: Middleware = async (to, next, options = {}) => {
  const { token } = options
  return next().then(() => {
    if (!to.meta?.auth) {
      if (!token) {
        return Promise.reject({ type: 'error', redirect: RoutePathEnum.LOGIN })
      }
    }
  })
}

export function useGuards({ to }: UseGuardsOptions, dependencies: any[] = []) {
  const [loading, setLoading] = useState(true)
  const [allow, setAllow] = useState(false)
  const [redirect, setRedirect] = useState<string | undefined>()
  const [token] = useUserStore((state) => [state.token])
  const deferred = useRef<Deferred>()
  const next = () => {
    return deferred.current!.promise
  }

  useEffect(() => {
    // Cancel the previous request
    if (deferred.current) {
      deferred.current.reject({ type: 'cancel' })
    }

    deferred.current = new Deferred()

    // 第一个 guard，往这里添加更多的 guard 顺序执行
    authMiddleware(to, next, {
      token
    })
      .then(() => {
        consola.info('allow')
        setLoading(false)
        setAllow(true)
        deferred.current = undefined
      })
      .catch((e: { type: 'cancel'; redirect: string }) => {
        if (e?.type === 'cancel') {
          return
        }
        if (e.redirect) {
          setRedirect(e.redirect)
        }
        setLoading(false)
        setAllow(false)
      })
    deferred.current!.resolve()
  }, [token, dependencies])

  return { loading, allow, redirect }
}

import { Deferred } from '@yc-tech/shared'
import { useUpdateEffect } from 'ahooks'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '~/store/userStore'
import { Middleware, RouteConfig } from '../type'
import { authMiddleware } from './guard'
export type UseGuardsOptions = {
  to: RouteConfig
  [key: string]: any
}

const guards: Middleware[] = [authMiddleware]

export function useGuards({ to }: UseGuardsOptions, dependencies: any[] = []) {
  const [loading, setLoading] = useState(true)
  const [allow, setAllow] = useState(false)
  const [redirect, setRedirect] = useState<string | undefined>()
  const [token, initialed, setInitialed, setUserInfo] = useUserStore((state) => [
    state.token,
    state.initialed,
    state.setInitialed,
    state.setUserInfo
  ])

  const deferred = useRef<Deferred>()

  const init = () => {
    // Cancel the previous request
    if (deferred.current) {
      deferred.current.reject({ type: 'cancel' })
    }

    deferred.current = new Deferred()
    // 第一个 guard，往这里添加更多的 guard 顺序执行
    const _next = guards.reduce<() => Promise<any>>(
      (prev, current) => {
        return () =>
          current(to, prev, {
            token,
            initialed,
            setInitialed,
            setUserInfo
          })
      },
      () => deferred.current!.promise
    )
    _next()
      .then(() => {
        setLoading(false)
        setAllow(true)
        setRedirect(undefined)
        deferred.current = undefined
      })
      .catch((e: { type: 'cancel'; redirect: string }) => {
        if (e?.type === 'cancel') {
          return
        }

        setLoading(false)
        setAllow(false)

        if (e.redirect) {
          setRedirect(e.redirect)
          consola.info('redirect', e.redirect)
          return
        }
      })
    deferred.current!.resolve()
  }

  useUpdateEffect(() => {
    init()
  }, [token, initialed, to.path, ...dependencies])

  useEffect(() => {
    init()
  }, [])

  return { loading, allow, redirect }
}

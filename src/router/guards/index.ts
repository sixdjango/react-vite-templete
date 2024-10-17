import { Deferred } from '@yc-tech/shared'
import { useUpdateEffect } from 'ahooks'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '~/store/userStore'
import { RouteConfig } from '../type'
import { authMiddleware } from './guard'
export type UseGuardsOptions = {
  to: RouteConfig
  [key: string]: any
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

  const init = () => {
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
  }, [token, to.path, ...dependencies])

  useEffect(() => {
    init()
  }, [])

  return { loading, allow, redirect }
}

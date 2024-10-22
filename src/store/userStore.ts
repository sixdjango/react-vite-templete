import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CacheEnum } from '~/constants/CacheEnum'

export type UserInfo = {
  name?: string
  avatar?: string
  email?: string
}
interface UserStore {
  token?: string
  initialed?: boolean
  userInfo?: UserInfo
  setToken: (token: string) => void
  setInitialed: (initialed: boolean) => void
  setUserInfo: (userInfo: UserInfo) => void
  removeToken: () => void
}
/**
 * @file useUserStore.ts
 * @description
 * @author django
 */
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: undefined,
      initialed: false,
      setToken: (token) => {
        set({ token })
        Cookies.set(CacheEnum.COOKIE_TOKEN, token)
      },
      removeToken: () => {
        set({ token: undefined })
        Cookies.remove(CacheEnum.COOKIE_TOKEN)
      },
      setInitialed: (initialed) => {
        set({ initialed })
      },
      setUserInfo: (userInfo) => {
        set({ userInfo })
      }
    }),
    {
      name: CacheEnum.USER_STORE,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        userInfo: state.userInfo
      }),
      merge(persistedState, currentState) {
        const token = Cookies.get(CacheEnum.COOKIE_TOKEN)
        return {
          ...(persistedState as UserStore),
          ...currentState,
          token
        }
      }
    }
  )
)

export { useUserStore }

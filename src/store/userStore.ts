import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { CacheEnum } from '~/constants/CacheEnum'

interface UserStore {
  token?: string
}
/**
 * @file useUserStore.ts
 * @description
 * @author django
 */
const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: undefined
    }),
    {
      name: CacheEnum.USER_STORE,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useUserStore }

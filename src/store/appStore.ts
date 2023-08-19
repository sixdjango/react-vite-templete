import { create } from 'zustand'
import { combine, createJSONStorage, persist } from 'zustand/middleware'

/**
 * @file appStore.ts
 * @description combine：自动推断返回值类型 persist：持久化
 * @author django
 * @date 2023-08-19
 */
const useAppStore = create(persist(combine({ count: 0 },
  set => ({
    plus: () => set(state => ({ count: state.count + 1 })),
    minus: () => set(state => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }),
), { name: 'app-storage', storage: createJSONStorage(() => localStorage) }))

export { useAppStore }

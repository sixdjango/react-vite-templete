import { createConsola } from 'consola'
import { isProdMode } from '~/configs/env'

export const consola = createConsola({
  level: isProdMode() ? 0 : 4,
})

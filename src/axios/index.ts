import { createNiceAxios } from 'nice-axios'
import { tokenPlugin } from './plugins/tokenPlugin'
import { globSetting } from '~/configs/setting'

export const http = createNiceAxios(
  {
    baseURL: globSetting.apiUrl
  },
  [tokenPlugin]
)

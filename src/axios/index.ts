import { createNiceAxios } from 'nice-axios'
import { tokenPlugin } from './plugins/tokenPlugin'
import { globSetting } from '~/configs/setting'

export const http = createNiceAxios([
  { desc: '请求token', order: -960, executor: tokenPlugin },
], {
  baseURL: globSetting.apiUrl,

})

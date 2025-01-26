import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'
import { PiniaColada } from '@pinia/colada'

const pinia = createPinia()
function registerStore(app: App) {
  app.use(pinia)
  app.use(PiniaColada)
  // // 默认加载数据及添加动态路由
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore

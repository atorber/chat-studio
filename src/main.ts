import '@/assets/css/define/theme.less'
import '@/assets/css/define/global.less'
import '@/assets/css/dropsize.less'
import './plugins/highlight'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'
import * as plugins from './plugins'
import { setupNaiveDiscreteApi, setupNaive, setupDirectives } from '@/plugins';
import naive from 'naive-ui'

async function bootstrap() {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  app.use(pinia)
  app.use(router)
  app.use(naive)

  plugins.setHljsVuePlugin(app)
  plugins.setupNaive(app)
  plugins.setMdEditor(app)
  plugins.setComponents(app)
  plugins.setupDirective(app)

  app.mount('#app')
}

bootstrap()

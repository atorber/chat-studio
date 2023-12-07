import '@/assets/css/define/theme.less'
import '@/assets/css/define/global.less'
import '@/assets/css/dropsize.less'
import './styles/tailwind.css';
import './plugins/highlight'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import App from './App.vue'
import * as plugins from './plugins'
import { setupNaive } from '@/plugins';
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

  // https://www.naiveui.com/en-US/os-theme/docs/style-conflict#About-Tailwind's-Preflight-Style-Override
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  app.mount('#app', true)
}

bootstrap()

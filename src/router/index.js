import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'
import MainLayout from '@/layout/MainLayout.vue'

import SettingRouter from './modules/setting'
import ContactRouter from './modules/contact'
import AuthRouter from './modules/auth'
import StatisticRouter from './modules/statistic'
import WhitelistRouter from './modules/whitelist'
import QaRouter from './modules/qa'
import ChatbotRouter from './modules/chatbot'
import AppRouter from './modules/app'

const IFrame = () => import('@/views/iframe/index.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth: true },
    component: MainLayout,
    redirect: '/workplace',
    children: [
      {
        path: '/message',
        name: 'message',
        meta: { auth: true },
        component: () => import('@/views/message/index.vue')
      },
      {
        path: '/workplace',
        name: 'workplace',
        meta: { auth: true },
        component: () => import('@/views/workplace/workplace.vue')
      },  
      {
        path: '/note',
        name: 'note',
        meta: { auth: true },
        component: () => import('@/views/note/index.vue')
      },
      {
        path: '/plugin',
        name: 'plugin',
        meta: { auth: true },
        component: () => import('@/views/plugin/index.vue')
      },
      AppRouter,
      QaRouter,
      ChatbotRouter,
      {
        path: '/keyword',
        name: 'keyword',
        meta: { auth: true },
        component: () => import('@/views/keyword/index.vue')
      },
      {
        path: '/help',
        name: 'help',
        meta: {
          auth: true,
          title: '项目文档(内嵌)',
          frameSrc: 'https://www.yuque.com/atorber/chatflow',
        },
        component: IFrame,
      },
      {
        path: '/example',
        name: 'example',
        component: () => import('@/views/example/index.vue')
      },
      SettingRouter,
      ContactRouter,
      StatisticRouter,
      WhitelistRouter,
    ]
  },
  AuthRouter,
  {
    path: '/:pathMatch(.*)*',
    name: '404 NotFound',
    component: () => import('@/views/other/not-found.vue')
  }
]

const getHistoryMode = () => {
  return import.meta.env.VITE_ROUTER_MODE == 'hash' ? createWebHashHistory() : createWebHistory()
}

const router = createRouter({
  history: getHistoryMode(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 设置中间件，权限验证
router.beforeEach((to) => {
  if (to.meta?.auth && !isLoggedIn()) {
    return {
      path: '/auth/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router

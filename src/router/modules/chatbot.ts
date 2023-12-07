export default {
    path: '/chatbot',
    name: 'ChatBot',
    redirect: '/chatbot/list',
    component: () => import('@/views/chatbot/layout.vue'),
    children: [
      {
        path: '/chatbot/list',
        meta: { auth: true },
        component: () => import('@/views/chatbot/index.vue')
      },
      {
        path: '/chatbot/whitelist',
        meta: { auth: true },
        component: () => import('@/views/chatbot/white.vue')
      },
      {
        path: '/chatbot/prompt',
        meta: { auth: true },
        component: () => import('@/views/chatbot/prompt.vue')
      }
    ]
  }
  
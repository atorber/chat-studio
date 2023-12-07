export default {
    path: '/qa',
    name: 'qa',
    redirect: '/qa/list',
    component: () => import('@/views/qa/layout.vue'),
    children: [
      {
        path: '/qa/list',
        meta: { auth: true },
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/qa/whitelist',
        meta: { auth: true },
        component: () => import('@/views/whitelist/white.vue')
      },
      {
        path: '/qa/config',
        meta: { auth: true },
        component: () => import('@/views/qa/detail.vue')
      }
    ]
  }
  
export default {
    path: '/whitelist',
    name: 'whitelist',
    redirect: '/whitelist/white',
    component: () => import('@/views/whitelist/layout.vue'),
    children: [
      {
        path: '/whitelist/white',
        meta: { auth: true },
        component: () => import('@/views/whitelist/white.vue')
      },
      {
        path: '/whitelist/black',
        meta: { auth: true },
        component: () => import('@/views/whitelist/black.vue')
      },
      {
        path: '/whitelist/security',
        meta: { auth: true },
        component: () => import('@/views/notice/index.vue')
      },
      {
        path: '/whitelist/binding',
        meta: { auth: true },
        component: () => import('@/views/whitelist/binding.vue')
      },
      {
        path: '/whitelist/personalize',
        meta: { auth: true },
        component: () => import('@/views/whitelist/personalize.vue')
      },
      {
        path: '/whitelist/notification',
        meta: { auth: true },
        component: () => import('@/views/whitelist/notification.vue')
      }
    ]
  }
  
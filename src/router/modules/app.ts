export default {
    path: '/app',
    name: 'app',
    redirect: '/app/notice',
    component: () => import('@/views/app/layout.vue'),
    children: [
      {
        path: '/app/notice',
        name: 'notice',
        meta: { auth: true },
        component: () => import('@/views/notice/index.vue')
      },
      {
        path: '/app/groupnotice',
        name: 'groupnotice',
        meta: { auth: true },
        component: () => import('@/views/groupnotice/index.vue')
      },
      {
        path: '/app/keyword',
        meta: { auth: true },
        component: () => import('@/views/keyword/index.vue')
      },
      {
        path: '/app/whitelist',
        meta: { auth: true },
        component: () => import('@/views/whitelist/white.vue')
      },
      {
        path: '/app/blacklist',
        meta: { auth: true },
        component: () => import('@/views/whitelist/black.vue')
      }
    ]
  }
  
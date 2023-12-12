export default {
    path: '/statistic',
    name: 'statistic',
    redirect: '/statistic/list',
    component: () => import('@/views/statistic/layout.vue'),
    children: [
      {
        path: '/statistic/list',
        meta: { auth: true },
        component: () => import('@/views/statistic/statistic.vue')
      },
      {
        path: '/statistic/order',
        meta: { auth: true },
        component: () => import('@/views/statistic/order.vue')
      },
      {
        path: '/statistic/whitelist',
        meta: { auth: true },
        component: () => import('@/views/statistic/white.vue')
      },
      {
        path: '/statistic/config',
        meta: { auth: true },
        component: () => import('@/views/statistic/detail.vue')
      }
    ]
  }
  
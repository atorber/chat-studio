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
      }
    ]
  }
  
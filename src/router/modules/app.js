export default {
    path: '/app',
    name: 'app',
    redirect: '/app/security',
    component: () => import('@/views/app/layout.vue'),
    children: [
      {
        path: '/app/security',
        meta: { requiresAuth: true },
        component: () => import('@/views/app/security.vue'),
      },
      {
        path: '/app/detail',
        meta: { requiresAuth: true },
        component: () => import('@/views/app/detail.vue'),
      },
      {
        path: '/app/binding',
        meta: { requiresAuth: true },
        component: () => import('@/views/app/binding.vue'),
      },
      {
        path: '/app/personalize',
        meta: { requiresAuth: true },
        component: () => import('@/views/app/personalize.vue'),
      },
      {
        path: '/app/notification',
        meta: { requiresAuth: true },
        component: () => import('@/views/app/notification.vue'),
      },
    ],
  }
  
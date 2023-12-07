<script setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User, Setting, Mark, Order } from '@icon-park/vue-next'

const menus = [
  {
    name: '活动',
    path: '/statistic/list',
    icon: Mark
  },
  {
    name: '记录',
    path: '/statistic/order',
    icon: Order
  },
  {
    name: '白名单',
    path: '/statistic/whitelist',
    icon: Protect
  },
  {
    name: '配置',
    path: '/statistic/config',
    icon: Setting
  },
  // {
  //   name: '绑定设置',
  //   path: '/statistic/binding',
  //   icon: LinkThree
  // },
  // {
  //   name: '通知设置',
  //   path: '/statistic/notification',
  //   icon: Remind
  // },
]
</script>

<template>
  <SubViewLayout title="统计&打卡" :menus="menus" />
</template>

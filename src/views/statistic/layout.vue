<script setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User } from '@icon-park/vue-next'

const menus = [
  {
    name: '活动',
    path: '/statistic/list',
    icon: User
  },
  {
    name: '记录',
    path: '/statistic/order',
    icon: Tool
  },
  // {
  //   name: '安全设置',
  //   path: '/statistic/security',
  //   icon: Protect
  // },
  // {
  //   name: '个性设置',
  //   path: '/statistic/personalize',
  //   icon: Remind
  // },
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

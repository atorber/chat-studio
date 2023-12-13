<script setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User, Setting, Mark, Order } from '@icon-park/vue-next'

const menus = [
  {
    name: '问题列表',
    path: '/qa/list',
    icon: Mark
  },
  {
    name: '白名单',
    path: '/qa/whitelist',
    icon: Protect
  },
  {
    name: '配置',
    path: '/qa/config',
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
  <SubViewLayout title="自动问答" :menus="menus" />
</template>

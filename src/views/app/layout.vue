<script setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User, Setting, Mark, Order, Key, ListSuccess, Blackboard } from '@icon-park/vue-next'

const menus = [
  {
    name: '定时提醒',
    path: '/app/notice',
    icon: Mark
  },
  {
    name: '群发消息',
    path: '/app/groupnotice',
    icon: Protect
  },
  {
    name: '关键词',
    path: '/app/keyword',
    icon: Key
  },
  {
    name: '白名单',
    path: '/app/whitelist',
    icon: ListSuccess
  },
  // {
  //   name: '黑名单',
  //   path: '/app/blacklist',
  //   icon: Blackboard
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
  <SubViewLayout title="应用中心" :menus="menus" />
</template>

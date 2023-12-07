<script setup>
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User, Setting, Mark, Order } from '@icon-park/vue-next'

const menus = [
  {
    name: 'ChatBot列表',
    path: '/chatbot/list',
    icon: Mark
  },
  // {
  //   name: '提示词',
  //   path: '/chatbot/prompt',
  //   icon: Setting
  // },
  {
    name: '白名单',
    path: '/chatbot/whitelist',
    icon: Protect
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
  <SubViewLayout title="聊天机器人" :menus="menus" />
</template>

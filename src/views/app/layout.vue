<script setup>
import Layout from '@/layout/index.vue'
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { Tool, Protect, Remind, LinkThree, User } from '@icon-park/vue-next'

const menus = [
  {
    name: '智能问答',
    path: '/app/detail',
    icon: User,
  },
  {
    name: '情话大师',
    path: '/app/security',
    icon: Protect,
  },
  {
    name: '群发助手',
    path: '/app/personalize',
    icon: Tool,
  },
  {
    name: '互译助手',
    path: '/app/binding',
    icon: LinkThree,
  },
  {
    name: '定时任务',
    path: '/app/notification',
    icon: Remind,
  },
]
</script>

<template>
  <Layout :index="4">
    <SubViewLayout title="我的设置" :menus="menus" />
  </Layout>
</template>

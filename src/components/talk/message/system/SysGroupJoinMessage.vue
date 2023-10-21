<script setup>
import { inject } from 'vue'
import './sys-message.less'

defineProps({
  extra: {
    type: Object,
    default: () => ({}),  // 设置默认值为一个空对象
  },
  data: {
    type: Object,
    default: () => ({}),  // 设置默认值为一个空对象
  },
})

const showUserModal = inject('$user')
</script>

<template>
  <div class="im-message-sys-text">
    <div class="sys-text">
      <a @click="showUserModal(extra.owner_id)">
        {{ extra.owner_name }}
      </a>

      <span>邀请了</span>

      <template v-for="(user, index) in extra.members" :key="index">
        <a @click="showUserModal(user.user_id)">{{ user.nickname }}</a>
        <em v-show="index < extra.members.length - 1">、</em>
      </template>

      <span>加入群聊</span>
    </div>
  </div>
</template>
<script setup>
import './sys-message.less'
import { inject } from 'vue'
const showUserModal = inject('$user')

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
</script>

<template>
  <div class="im-message-sys-text">
    <div class="sys-text">
      <a @click="showUserModal(extra.owner_id)">
        {{ extra.owner_name }}
      </a>

      <span>退出了群聊</span>
    </div>
  </div>
</template>

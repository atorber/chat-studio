<script setup>
// const props = defineProps({
//   extra: {
//     type: Object,
//     default: () => ({}),  // 设置默认值为一个空对象
//   },
//   data: {
//     type: Object,
//     default: () => ({}),  // 设置默认值为一个空对象
//   },
// })
</script>

<template>
  <div class="im-message-unknown">[{{ data.msg_type }}] 未知消息类型</div>
</template>

<style lang="less" scoped>
.im-message-unknown {
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  color: #979191;
  background: #eff0f1;
  width: 150px;
  text-align: center;
  font-weight: 300;
}
</style>

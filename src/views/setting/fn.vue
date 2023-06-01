<script setup>
import { computed } from 'vue'
import { NSwitch } from 'naive-ui'
import { useNotifyStore } from '@/store/notify'

const notifyStore = useNotifyStore()

const isPromptTone = computed({
  get: () => notifyStore.isPromptTone,
  set: val => {
    notifyStore.setPromptTone(val)
  },
})

const isKeyboard = computed({
  get: () => notifyStore.isKeyboard,
  set: val => {
    notifyStore.setKeyboard(val)
  },
})

const isWebNotify = computed({
  get: () => notifyStore.isWebNotify,
  set: val => {
    if (val === false) {
      notifyStore.isWebNotify = false
    } else {
      window.Notification.requestPermission(res => {
        console.log(res)
        notifyStore.isWebNotify = 'granted' === res
      })
    }
  },
})
</script>

<template>
  <section>
    <h3 class="title">智能问答 | autoQa</h3>
    <div class="view-box">
      <div class="view-list">
        <div class="content">
          <div class="name">自动问答</div>
          <div class="desc">autoReply ：{{ isPromptTone ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isPromptTone" />
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">AT回复</div>
          <div class="desc">atReply：{{ isKeyboard ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isKeyboard" />
        </div>
      </div>
      <div class="view-list">
        <div class="content">
          <div class="name">不同群个性回复</div>
          <div class="desc">customReply：{{ isWebNotify ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isWebNotify" />
        </div>
      </div>
    </div>
    <h3 class="title">维格表</h3>
    <div class="view-box">
      <div class="view-list">
        <div class="content">
          <div class="name">启用</div>
          <div class="desc">useVika ：{{ isPromptTone ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isPromptTone" />
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">消息上传</div>
          <div class="desc">uploadMessageToVika：{{ isKeyboard ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isKeyboard" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import '@/assets/css/settting.less';
</style>

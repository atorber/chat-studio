<script setup>
import { computed } from 'vue'
import { NSwitch } from 'naive-ui'
// import { Brightness, Moon, DarkMode } from '@icon-park/vue-next'
import { useSettingsStore } from '@/store'
import { isElectronMode } from '@/utils/common'

const settingsStore = useSettingsStore()

const isPromptTone = computed({
  get: () => settingsStore.isPromptTone,
  set: (val) => {
    settingsStore.setPromptTone(val)
  }
})

const isKeyboard = computed({
  get: () => settingsStore.isKeyboard,
  set: (val) => {
    settingsStore.setKeyboard(val)
  }
})

const isWebNotify = computed({
  get: () => settingsStore.isWebNotify,
  set: (val) => {
    if (val === false) {
      settingsStore.isWebNotify = false
    } else {
      window.Notification.requestPermission((res) => {
        console.log(res)
        settingsStore.isWebNotify = 'granted' === res
      })
    }
  }
})

const isFullScreen = computed({
  get: () => settingsStore.isFullScreen,
  set: (val) => {
    settingsStore.setFullScreen(val)
  }
})

const darkTheme = computed({
  get: () => !settingsStore.darkTheme,
  set: (val) => {
    settingsStore.setDarkTheme(!val)
  }
})

const railStyle = ({ focused, checked }) => {
  const style = {}
  if (checked) {
    style.background = '#d03050'
    if (focused) {
      style.boxShadow = '0 0 0 2px #d0305040'
    }
  } else {
    style.background = '#2080f0'
    if (focused) {
      style.boxShadow = '0 0 0 2px #2080f040'
    }
  }
  return style
}
</script>

<template>
  <section>
    <h3 class="title">个性设置</h3>

    <div class="view-box">
      <div class="view-list">
        <div class="content">
          <div class="name">新消息提示音</div>
          <div class="desc">新消息提示音 ：{{ isPromptTone ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isPromptTone" />
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">推送键盘输入消息</div>
          <div class="desc">推送键盘输入消息：{{ isKeyboard ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isKeyboard" />
        </div>
      </div>
      <div class="view-list">
        <div class="content">
          <div class="name">消息通知</div>
          <div class="desc">消息通知：{{ isWebNotify ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isWebNotify" />
        </div>
      </div>
      <div class="view-list">
        <div class="content">
          <div class="name">主题颜色</div>
          <div class="desc">当前主题颜色 ：{{ darkTheme ? '浅色' : '深色' }}</div>
        </div>
        <div class="tools">
          <n-switch v-model:value="darkTheme" size="medium" />
        </div>
      </div>

      <div v-show="!isElectronMode()" class="view-list">
        <div class="content">
          <div class="name">主题模式</div>
          <div class="desc">当前主题模式 ：{{ isFullScreen ? '全屏模式' : '居中模式' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="isFullScreen" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
@import '@/assets/css/settting.less';
</style>

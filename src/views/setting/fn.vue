<script setup>
import { computed } from 'vue'
import { NSwitch } from 'naive-ui'
import { useNotifyStore } from '@/store/notify'

const baseConfig = {
  autoQa: {
    name:'智能问答',
    value:{
      autoReply: {
        name:'自动问答',
        value:false, // wechaty-puppet-padlocal、wechaty-puppet-service、wechaty-puppet-wechat、wechaty-puppet-wechat4u、wechaty-puppet-xp（运行npm run wechaty-puppet-xp安装）
      },
      atReply:{
        name:'AT回复',
        value:true, // wechaty token
      },
      customReply:{
        name:'不同群个性回复',
        value:true, // wechaty token
      },
    },
  },
  vika:{
    name:'维格表',
    value:{
      useVika: {
        name:'启用',
        value:true, // 管理群ID
      },
      uploadMessageToVika: {
        name:'消息上传',
        value:true, // 管理员微信ID
      },
    },
  },
}

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
    <block v-for="(item, key) in baseConfig" :key="key">
      <h3 class="title">{{item.name}} | {{key}}</h3>
    <div class="view-box">
      <div class="view-list" v-for="(subvalue, subkey) in item.value" :key="subkey">
        <div class="content">
          <div class="name">{{ subvalue.name }}</div>
          <div class="desc">{{subkey}} : {{ subvalue.value ? '已开启' : '已关闭' }}</div>
        </div>
        <div class="tools">
          <n-switch size="medium" v-model:value="subvalue.value" />
        </div>
      </div>
    </div>
        
      </block>
  </section>
</template>

<style lang="less" scoped>
@import '@/assets/css/settting.less';
</style>

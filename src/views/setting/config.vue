<script setup>
import { ref } from 'vue'
import EditPassword from '@/components/user/EditorPassword.vue'
import EditMobile from '@/components/user/EditorMobile.vue'
import EditEmail from '@/components/user/EditorEmail.vue'
import { useUserStore } from '@/store/user'
import { hidePhone } from '@/utils/strings'

const userStore = useUserStore()
const isShowChangePassword = ref(false)
const isShowChangeMobile = ref(false)
const isShowChangeEmail = ref(false)

const baseConfig = {
  admin: {
    roomid: '', // 管理群ID
    wxid: '7881302781913704', // 管理员微信ID
  },
  baiduvop: {
    ak: 'QRxKQ9fnrKca3FxpbfhyqBgC', // 百度云语音转文字接口ak
    sk: '----', // 百度云语音转文字接口sk
  },
  openai: {
    endpoint: 'https://api.openai-proxy.com', // openai api地址
    key: 'sk----------', // openai api密钥
  },
  wechaty: {
    puppet: 'wechaty-puppet-service', // wechaty-puppet-padlocal、wechaty-puppet-service、wechaty-puppet-wechat、wechaty-puppet-wechat4u、wechaty-puppet-xp（运行npm run wechaty-puppet-xp安装）
    token: '----', // wechaty token
  },
}

const onChangeMobileSuccess = value => {
  isShowChangeMobile.value = false
  userStore.mobile = value
}

const onChangeEmailSuccess = value => {
  isShowChangeEmail.value = false
  userStore.email = value
}
</script>

<template>
  <section>
    <block v-for="(value, key) in baseConfig" :key="key">

      <div class="title-wrapper">
        <h3 class="title margin-right">{{ key }}</h3>
        <n-button type="info" text @click="isShowChangePassword = true">
          修改
        </n-button>
      </div>

      <div class="view-box">
        <block v-for="(subvalue, subkey) in value" :key="subkey">
          <div class="view-list">
            <div class="content">
              <div class="name">{{ key }}.{{ subkey }}</div>
              <div class="desc">{{ subvalue || '未设置' }}</div>
            </div>
          </div>
        </block>
      </div>

    </block>
  </section>

  <EditPassword v-model="isShowChangePassword" />
  <EditMobile v-model="isShowChangeMobile" @success="onChangeMobileSuccess" />
  <EditEmail v-model="isShowChangeEmail" @success="onChangeEmailSuccess" />
</template>
<style lang="less" scoped>
@import '@/assets/css/settting.less';

/* 方式一：使用 flex 布局 */
.title-wrapper {
  display: flex;
  align-items: center;
}

.margin-right {
  margin-right: 30px;
}
</style>

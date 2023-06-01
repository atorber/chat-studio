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
  wechaty: {
    name:'Wechaty',
    value:{
      puppet: {
        name:'Puppet名称',
        value:'wechaty-puppet-service', // wechaty-puppet-padlocal、wechaty-puppet-service、wechaty-puppet-wechat、wechaty-puppet-wechat4u、wechaty-puppet-xp（运行npm run wechaty-puppet-xp安装）
      },
      token:{
        name:'PuppetToken',
        value:'', // wechaty token
      },
    },
  },
  admin:{
    name:'管理员信息',
    value:{
      roomid: {
        name:'管理员群ID',
        value:'', // 管理群ID
      },
      wxid: {
        name:'管理员微信ID',
        value:'7881302781913704', // 管理员微信ID
      },
    },
  },
  baiduvop: {
    name: '百度云语音转文字服务',
    value:{
      ak: {
        name:'Access Key',
        value:'QRxKQ9fnrKca3FxpbfhyqBgC', // 百度云语音转文字接口ak
      },
      sk: {
        name:'Secret Key',
        value:'', // 百度云语音转文字接口sk
      },
    },

  },
  openai:{
    name:'ChatGPT配置信息',
    value:{
      endpoint: {
        name:'API地址',
        value:'https://api.openai-proxy.com', // openai api地址
      },
      key: {
        name:'API密钥',
        value:'', // openai api密钥
      },
    },

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
    <block v-for="(item, key) in baseConfig" :key="key">

      <div class="title-wrapper">
        <h3 class="title margin-right">{{ item.name }} | {{ key }}</h3>
        <n-button type="info" text @click="isShowChangePassword = true">
          修改
        </n-button>
      </div>

      <div class="view-box">
        <block v-for="(subvalue, subkey) in item.value" :key="subkey">
          <div class="view-list">
            <div class="content">
              <div class="name">{{ subvalue.name }}</div>
              <div class="desc">{{ subkey }} : {{ subvalue.value || '未设置' }}</div>
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

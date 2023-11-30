<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NDatePicker, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { NSwitch } from 'naive-ui'

import { ServeUpdateUserDetail, ServeGetUserDetail, ServeGetUserConfig } from '@/api/user'
import AvatarCropper from '@/components/base/AvatarCropper.vue'
import { hidePhone } from '@/utils/strings'
import { useUserStore } from '@/store'
// import { useSettingsStore } from '@/store'

// const settingsStore = useSettingsStore()

const userStore = useUserStore()
const router = useRouter()
const cropper = ref(false)

// const darkTheme = computed({
//   get: () => !settingsStore.darkTheme,
//   set: (val) => {
//     settingsStore.setDarkTheme(!val)
//   }
// })

let detail = reactive([
  {
    name: 'Wechaty-Puppet',
    key: 'WECHATY_PUPPET',
    value: 'wechaty-puppet-wechat4u',
    desc: '可选值：\nwechaty-puppet-wechat4u\nwechaty-puppet-wechat\nwechaty-puppet-xp\nwechaty-puppet-engine\\\\u0000\nwechaty-puppet-padlocal\nwechaty-puppet-service',
    syncStatus: '未同步',
    lastOperationTime: 1698763176337,
    action: '选择操作',
    id: 'recVIK4LlX2hu'
  },
  {
    name: 'Wechaty-Token',
    key: 'WECHATY_TOKEN',
    value: '',
    desc: '使用wechaty-puppet-padlocal、wechaty-puppet-service时需配置此token',
    syncStatus: '未同步',
    lastOperationTime: 1698763176337,
    action: '选择操作',
    id: 'recxfQW4LltPL'
  },
  {
    name: '基础配置-管理群ID',
    key: 'ADMINROOM_ADMINROOMID',
    desc: '管理群的ID，只有在此群内发布管理指令才会生效',
    value: '',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'recSpVOJ2VpuK'
  },
  {
    name: '基础配置-管理群名称',
    key: 'ADMINROOM_ADMINROOMTOPIC',
    value: '',
    desc: '管理群名称，只有在此群内发布管理指令才会生效',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'recNMre3ekU7S'
  },
  {
    name: '基础配置-机器人微信号',
    key: 'BASE_BOT_ID',
    value: '',
    desc: '机器人微信号，登录成功后自动更新',
    syncStatus: '已同步',
    lastOperationTime: 1701182607719,
    action: '选择操作',
    id: 'rechx9jc0TYeb'
  },
  {
    name: '基础配置-机器人微信昵称',
    key: 'BASE_BOT_NAME',
    value: '',
    desc: '机器人微信昵称，登录成功后自动更新',
    syncStatus: '已同步',
    lastOperationTime: 1701182607719,
    action: '选择操作',
    id: 'recIxTLzzwq0F'
  },
  {
    name: '维格表-启用维格表',
    key: 'VIKA_USEVIKA',
    value: 'false',
    desc: '启用维格表托管配置',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'recsMTURF8f8b'
  },
  {
    name: '维格表-消息上传到维格表',
    key: 'VIKA_UPLOADMESSAGETOVIKA',
    value: 'true',
    desc: '开启后消息记录会自动上传到维格表的【消息记录】表',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'recCF9KeDlYfJ'
  },
  {
    name: '智能问答-启用自动问答',
    key: 'AUTOQA_AUTOREPLY',
    value: 'false',
    desc: '开启后可以使用微信对话平台只能问答',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'recOHPSV1UXed'
  },
  {
    name: '微信对话开放平台-Token',
    key: 'WXOPENAI_TOKEN',
    value: '',
    desc: '微信对话开放平台中获取',
    syncStatus: '未同步',
    lastOperationTime: 1698763176338,
    action: '选择操作',
    id: 'rect1Ow10AyEV'
  },
  {
    name: '微信对话开放平台-EncodingAESKey',
    key: 'WXOPENAI_ENCODINGAESKEY',
    value: '',
    desc: '微信对话开放平台中获取',
    syncStatus: '未同步',
    lastOperationTime: 1698763177863,
    action: '选择操作',
    id: 'recqyJ7IfqiBf'
  },
  {
    name: '微信对话开放平台-APPID',
    key: 'WXOPENAI_APPID',
    value: '',
    desc: '微信对话开放平台中获取，应用ID',
    syncStatus: '未同步',
    lastOperationTime: 1698763177863,
    action: '选择操作',
    id: 'recL8wbMWUAhZ'
  },
  {
    name: '微信对话开放平台-管理员ID',
    key: 'WXOPENAI_MANAGERID',
    desc: '微信对话开放平台中获取',
    syncStatus: '未同步',
    value: '',
    lastOperationTime: 1698763177863,
    action: '选择操作',
    id: 'rec91DsuOOtFS'
  },
  {
    name: 'ChatGPT-Key',
    value: '',
    key: 'CHATGPT_KEY',
    desc: 'openai平台获取',
    syncStatus: '未同步',
    lastOperationTime: 1698763177863,
    action: '选择操作',
    id: 'recquS5la77Zv'
  },
  {
    name: 'ChatGPT-Endpoint',
    key: 'CHATGPT_ENDPOINT',
    value: '',
    desc: 'openai平台获取',
    syncStatus: '未同步',
    lastOperationTime: 1698763177863,
    action: '选择操作',
    id: 'recEj8z5PEdIA'
  },
  {
    name: 'MQTT连接-MQTT推送',
    key: 'MQTT_MQTTMESSAGEPUSH',
    value: 'false',
    desc: '开启后消息会发送到MQTT队列，需要先配置MQTT配置项',
    syncStatus: '未同步',
    lastOperationTime: 1698763177864,
    action: '选择操作',
    id: 'rec98hutN5hSo'
  },
  {
    name: 'MQTT连接-MQTT控制',
    key: 'MQTT_MQTTCONTROL',
    value: 'false',
    desc: '开启可以通过MQTT控制微信，需要先配置MQTT配置项',
    syncStatus: '未同步',
    lastOperationTime: 1698763177864,
    action: '选择操作',
    id: 'reck3GTU7v0bP'
  },
  {
    name: 'MQTT连接-用户名',
    key: 'MQTT_USERNAME',
    desc: 'MQTT连接配置信息，推荐使用百度云的物联网核心套件',
    syncStatus: '未同步',
    lastOperationTime: 1698763177864,
    action: '选择操作',
    id: 'recEzimaSrgid'
  },
  {
    name: 'MQTT连接-密码',
    key: 'MQTT_PASSWORD',
    desc: 'MQTT连接配置信息，推荐使用百度云的物联网核心套件',
    syncStatus: '未同步',
    lastOperationTime: 1698763177864,
    action: '选择操作',
    id: 'recbYcgDOygbW'
  },
  {
    name: 'MQTT连接-接入地址',
    key: 'MQTT_ENDPOINT',
    value: 'broker.emqx.io',
    desc: 'MQTT连接配置信息，推荐使用百度云的物联网核心套件',
    syncStatus: '未同步',
    lastOperationTime: 1698763177864,
    action: '选择操作',
    id: 'recEDUfGkhWSH'
  },
  {
    name: 'MQTT连接-端口号',
    key: 'MQTT_PORT',
    value: '8883',
    desc: 'MQTT连接配置信息，推荐使用百度云的物联网核心套件',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'rec5OQN3xX3ih'
  },
  {
    name: 'MQTT连接-端口号SSL',
    key: 'MQTT_PORT_SSL',
    value: '8084',
    desc: 'MQTT连接配置信息，推荐使用百度云的物联网核心套件',
    syncStatus: '未同步',
    lastOperationTime: 1698839126254,
    action: '选择操作',
    id: 'recubXdlLFeXe'
  },
  {
    name: 'HTTP消息推送-WebHook推送',
    key: 'WEBHOOK_WEBHOOKMESSAGEPUSH',
    value: 'false',
    desc: 'TODO-开启后系统将机器人事件消息推送到指定的地址',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'rec0nOQfpNNUj'
  },
  {
    name: 'HTTP消息推送-地址',
    key: 'WEBHOOK_URL',
    desc: '格式 http://baidu.com/abc,多个地址使用英文逗号隔开，使用post请求推送',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recUWJLjmU2nO'
  },
  {
    name: 'HTTP消息推送-Token',
    key: 'WEBHOOK_TOKEN',
    desc: '当填写token时优先使用token，其次用户名+密码，再次无鉴权请求',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recHh8s81aZXO'
  },
  {
    name: 'HTTP消息推送-用户名',
    key: 'WEBHOOK_USERNAME',
    desc: '当填写token时优先使用token，其次用户名+密码，再次无鉴权请求',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recGReHNVx6N4'
  },
  {
    name: 'HTTP消息推送-密码',
    key: 'WEBHOOK_PASSWORD',
    desc: '当填写token时优先使用token，其次用户名+密码，再次无鉴权请求',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recVM7JzpC4Zq'
  },
  {
    name: '语雀-token',
    key: 'YUQUE_TOKEN',
    desc: '语雀知识库token',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recslxPL1lG3G'
  },
  {
    name: '语雀-空间名称',
    key: 'YUQUE_NAMESPACE',
    desc: '语雀知识库空间名称',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recQXRHkGA2tu'
  },
  {
    name: '下发消息加密',
    key: 'MESSAGE_ENCRYPT',
    value: 'false',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'rec9DeXtq6PLY'
  },
  {
    name: '消息加密密钥',
    key: 'MESSAGE_ENCODINGAESKEY',
    value: '',
    desc: '消息加密密钥，vika推送地址https://3sewxanjdvsbp.cfc-execute.bj.baidubce.com/mqtt',
    syncStatus: '未同步',
    lastOperationTime: 1698763179331,
    action: '选择操作',
    id: 'recL7JiypBJPv'
  }
])

// 加载用户信息
// ServeGetUserDetail().then(({ data }) => {
//   detail.nickname = data.nickname.toString()
//   detail.mobile = data.mobile.toString()
//   detail.email = data.email.toString()
//   detail.gender = data.gender.toString()
//   detail.motto = data.motto.toString()
//   detail.avatar = data.avatar
//   if (data.birthday) {
//     detail.birthday = ref(data.birthday)
//   }
// })

// 加载用户系统配置
ServeGetUserConfig().then(({ data }) => {
  data = data.map((item) => {
    if (item.value === 'true') {
      item.value = true
    }
    if (item.value === 'false') {
      item.value = false
    }
    return item
  })
  console.log(JSON.stringify(data))
  detail = reactive(data)
})

// 修改用户信息
const onChangeDetail = () => {
  if (!detail.nickname.trim()) {
    return window['$message'].warning('昵称不能为空')
  }

  detail.loading = true

  const response = ServeUpdateUserDetail({
    nickname: detail.nickname.trim(),
    avatar: detail.avatar,
    motto: detail.motto,
    gender: parseInt(detail.gender),
    birthday: detail.birthday
  })

  response.then(() => {
    window['$message'].success('信息保存成功')
    userStore.loadSetting()
  })

  response.catch(() => {
    window['$message'].warning('信息保存失败')
  })

  response.finally(() => {
    detail.loading = false
  })
}

const onUploadAvatar = (avatar) => {
  cropper.value = false
  detail.avatar = avatar
  onChangeDetail()
}
</script>

<template>
  <h3 class="title">系统配置</h3>
  <div class="view-box">
    <section class="el-container container">
      <!-- <aside class="el-aside el-aside-left">
      <n-avatar
        :size="200"
        :src="detail.avatar"
        @click="cropper = true"
        class="avatar-box pointer"
      />

      <n-button text @click="cropper = true"> 点击修改头像 </n-button>
    </aside> -->

      <main class="el-main" style="padding-right: 20px">
        <n-form
          ref="formRef"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="medium"
          style="max-width: 500px; margin-top: 25px"
        >
          <n-form-item
            :label="item.name"
            v-for="item in detail"
            :key="item.id"
            style="width: 750px"
          >
            <!-- 当 item.value 不是 true 或 false 时显示 n-input -->
            <n-input
              v-if="typeof item.value !== 'boolean'"
              :placeholder="item.desc"
              v-model:value="item.value"
              maxlength="64"
              show-count
            />

            <!-- 当 item.value 是 true 或 false 时显示 n-switch -->
            <n-switch
              v-if="typeof item.value === 'boolean'"
              v-model:value="item.value"
              size="medium"
            />
            <!-- <n-radio-group
              v-model:value="item.value"
              name="gender"
              v-if="typeof item.value === 'boolean'">
              <n-space>
                <n-radio key="1" value="true"> 开 </n-radio>
                <n-radio key="0" value="false"> 关 </n-radio>
              </n-space>
            </n-radio-group> -->
          </n-form-item>

          <n-form-item>
            <n-button
              type="primary"
              @click="onChangeDetail"
              :loading="detail.loading"
              style="margin-left: 375px"
            >
              保存修改
            </n-button>
          </n-form-item>
        </n-form>
      </main>
    </section>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/settting.less';

.container {
  height: auto;
}

.el-aside-left {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-right: 10px;
}

.avatar-box {
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>

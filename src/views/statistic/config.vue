<script setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NDatePicker, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { NSwitch } from 'naive-ui'
import EditConfig from '@/components/user/EditorConfig.vue'

import {
  ServeUpdateUserDetail,
  ServeGetUserDetail,
  ServeGetUserConfigGroup
} from '@/api/user'
import AvatarCropper from '@/components/base/AvatarCropper.vue'
import { hidePhone } from '@/utils/strings'
import { useUserStore } from '@/store'
// import { useSettingsStore } from '@/store'

// const settingsStore = useSettingsStore()
let isShowChangePassword = ref(false)
let configFormItems = {}

const userStore = useUserStore()
const router = useRouter()
const cropper = ref(false)

const editItem = (name, editItem)=>{
  console.log('editItem', editItem)
  configFormItems = {
    name: name,
    items: editItem
  } 
  isShowChangePassword.value = true
}

// const darkTheme = computed({
//   get: () => !settingsStore.darkTheme,
//   set: (val) => {
//     settingsStore.setDarkTheme(!val)
//   }
// })

const configGroup = ref({
    "Wechaty":[
        {
            "name":"Puppet",
            "key":"WECHATY_PUPPET",
            "value":"wechaty-puppet-service",
            "desc":"可选值：\nwechaty-puppet-wechat4u\nwechaty-puppet-wechat\nwechaty-puppet-xp\nwechaty-puppet-engine\\\\u0000\nwechaty-puppet-padlocal\nwechaty-puppet-service",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176337,
            "action":"选择操作",
            "id":"recVIK4LlX2hu"
        },
        {
            "name":"Token",
            "key":"WECHATY_TOKEN",
            "value":"",
            "desc":"使用wechaty-puppet-padlocal、wechaty-puppet-service时需配置此token",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176337,
            "action":"选择操作",
            "id":"recxfQW4LltPL"
        }
    ],
    "基础配置":[
        {
            "name":"管理群ID",
            "key":"ADMINROOM_ADMINROOMID",
            "desc":"管理群的ID，只有在此群内发布管理指令才会生效",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"recSpVOJ2VpuK"
        },
        {
            "name":"管理群名称",
            "key":"ADMINROOM_ADMINROOMTOPIC",
            "value":"",
            "desc":"管理群名称，只有在此群内发布管理指令才会生效",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"recNMre3ekU7S"
        },
        {
            "name":"机器人微信号",
            "key":"BASE_BOT_ID",
            "value":"",
            "desc":"机器人微信号，登录成功后自动更新",
            "syncStatus":"已同步",
            "lastOperationTime":1701182607719,
            "action":"选择操作",
            "id":"rechx9jc0TYeb"
        },
        {
            "name":"机器人微信昵称",
            "key":"BASE_BOT_NAME",
            "value":"",
            "desc":"机器人微信昵称，登录成功后自动更新",
            "syncStatus":"已同步",
            "lastOperationTime":1701182607719,
            "action":"选择操作",
            "id":"recIxTLzzwq0F"
        }
    ],
    "维格表":[
        {
            "name":"启用维格表",
            "key":"VIKA_USEVIKA",
            "value":"false",
            "desc":"启用维格表托管配置",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"recsMTURF8f8b"
        },
        {
            "name":"消息上传到维格表",
            "key":"VIKA_UPLOADMESSAGETOVIKA",
            "value":"true",
            "desc":"开启后消息记录会自动上传到维格表的【消息记录】表",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"recCF9KeDlYfJ"
        }
    ],
    "智能问答":[
        {
            "name":"启用自动问答",
            "key":"AUTOQA_AUTOREPLY",
            "value":"false",
            "desc":"开启后可以使用微信对话平台只能问答",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"recOHPSV1UXed"
        }
    ],
    "微信对话开放平台":[
        {
            "name":"Token",
            "key":"WXOPENAI_TOKEN",
            "desc":"微信对话开放平台中获取",
            "syncStatus":"未同步",
            "lastOperationTime":1698763176338,
            "action":"选择操作",
            "id":"rect1Ow10AyEV"
        },
        {
            "name":"EncodingAESKey",
            "key":"WXOPENAI_ENCODINGAESKEY",
            "desc":"微信对话开放平台中获取",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177863,
            "action":"选择操作",
            "id":"recqyJ7IfqiBf"
        },
        {
            "name":"APPID",
            "key":"WXOPENAI_APPID",
            "desc":"微信对话开放平台中获取，应用ID",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177863,
            "action":"选择操作",
            "id":"recL8wbMWUAhZ"
        },
        {
            "name":"管理员ID",
            "key":"WXOPENAI_MANAGERID",
            "desc":"微信对话开放平台中获取",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177863,
            "action":"选择操作",
            "id":"rec91DsuOOtFS"
        }
    ],
    "ChatGPT":[
        {
            "name":"Key",
            "key":"CHATGPT_KEY",
            "desc":"openai平台获取",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177863,
            "action":"选择操作",
            "id":"recquS5la77Zv"
        },
        {
            "name":"Endpoint",
            "key":"CHATGPT_ENDPOINT",
            "desc":"openai平台获取",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177863,
            "action":"选择操作",
            "id":"recEj8z5PEdIA"
        }
    ],
    "MQTT连接":[
        {
            "name":"MQTT推送",
            "key":"MQTT_MQTTMESSAGEPUSH",
            "value":"true",
            "desc":"开启后消息会发送到MQTT队列，需要先配置MQTT配置项",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177864,
            "action":"选择操作",
            "id":"rec98hutN5hSo"
        },
        {
            "name":"MQTT控制",
            "key":"MQTT_MQTTCONTROL",
            "value":"true",
            "desc":"开启可以通过MQTT控制微信，需要先配置MQTT配置项",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177864,
            "action":"选择操作",
            "id":"reck3GTU7v0bP"
        },
        {
            "name":"用户名",
            "key":"MQTT_USERNAME",
            "desc":"MQTT连接配置信息，推荐使用百度云的物联网核心套件",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177864,
            "action":"选择操作",
            "id":"recEzimaSrgid"
        },
        {
            "name":"密码",
            "key":"MQTT_PASSWORD",
            "desc":"MQTT连接配置信息，推荐使用百度云的物联网核心套件",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177864,
            "action":"选择操作",
            "id":"recbYcgDOygbW"
        },
        {
            "name":"接入地址",
            "key":"MQTT_ENDPOINT",
            "value":"broker.emqx.io",
            "desc":"MQTT连接配置信息，推荐使用百度云的物联网核心套件",
            "syncStatus":"未同步",
            "lastOperationTime":1698763177864,
            "action":"选择操作",
            "id":"recEDUfGkhWSH"
        },
        {
            "name":"端口号",
            "key":"MQTT_PORT",
            "value":"8883",
            "desc":"MQTT连接配置信息，推荐使用百度云的物联网核心套件",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"rec5OQN3xX3ih"
        },
        {
            "name":"端口号SSL",
            "key":"MQTT_PORT_SSL",
            "value":"8084",
            "desc":"MQTT连接配置信息，推荐使用百度云的物联网核心套件",
            "syncStatus":"未同步",
            "lastOperationTime":1698839126254,
            "action":"选择操作",
            "id":"recubXdlLFeXe"
        }
    ],
    "HTTP消息推送":[
        {
            "name":"WebHook推送",
            "key":"WEBHOOK_WEBHOOKMESSAGEPUSH",
            "value":"false",
            "desc":"TODO-开启后系统将机器人事件消息推送到指定的地址",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"rec0nOQfpNNUj"
        },
        {
            "name":"地址",
            "key":"WEBHOOK_URL",
            "desc":"格式 http://baidu.com/abc,多个地址使用英文逗号隔开，使用post请求推送",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recUWJLjmU2nO"
        },
        {
            "name":"Token",
            "key":"WEBHOOK_TOKEN",
            "desc":"当填写token时优先使用token，其次用户名+密码，再次无鉴权请求",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recHh8s81aZXO"
        },
        {
            "name":"用户名",
            "key":"WEBHOOK_USERNAME",
            "desc":"当填写token时优先使用token，其次用户名+密码，再次无鉴权请求",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recGReHNVx6N4"
        },
        {
            "name":"密码",
            "key":"WEBHOOK_PASSWORD",
            "desc":"当填写token时优先使用token，其次用户名+密码，再次无鉴权请求",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recVM7JzpC4Zq"
        }
    ],
    "语雀":[
        {
            "name":"token",
            "key":"YUQUE_TOKEN",
            "desc":"语雀知识库token",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recslxPL1lG3G"
        },
        {
            "name":"空间名称",
            "key":"YUQUE_NAMESPACE",
            "desc":"语雀知识库空间名称",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recQXRHkGA2tu"
        }
    ],
    "消息加密":[
        {
            "name":"下发消息加密",
            "key":"MESSAGE_ENCRYPT",
            "value":"false",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"rec9DeXtq6PLY"
        },
        {
            "name":"消息加密密钥",
            "key":"MESSAGE_ENCODINGAESKEY",
            "value":"X00fcQHkvRkNUdJefu4FD6pym2oIvs63Y5NP3pnZ5po",
            "desc":"消息加密密钥，vika推送地址https://3sewxanjdvsbp.cfc-execute.bj.baidubce.com/mqtt",
            "syncStatus":"未同步",
            "lastOperationTime":1698763179331,
            "action":"选择操作",
            "id":"recL7JiypBJPv"
        }
    ]
})

// 加载用户系统配置组
ServeGetUserConfigGroup().then(({ data }) => {
  // console.log(JSON.stringify(data))
  configGroup.value = ref(data)
  console.log('configGroup: ', configGroup.value)
})

watch(() => configGroup, (newVal) => {
  console.log('configGroup 更新: ', newVal);
  // configGroup = newVal
}, { immediate: true });

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
    <div class="view-list" v-for="(item, key) in configGroup.value" :key="key">
      <div class="content">
        <!-- 使用 {{ }} 来显示 key -->
        <div class="name">{{ key }}</div>

        <!-- v-for 循环遍历 item 中的每个 subitem -->
        <div class="desc text-ellipsis">
          <!-- 显示 subitem 的 name 和 value -->
          <text class="" selectable="false" space="false" decode="false" v-for="subitem in item" :key="subitem.id">
            <block v-if="typeof subitem.value !== 'boolean'">{{ subitem.name }} : {{ subitem.value || '未设置' }} &nbsp;&nbsp;&nbsp;&nbsp;</block>
            <block v-if="typeof subitem.value === 'boolean'">{{ subitem.name }} : {{ subitem.value?'开':'关' }} &nbsp;&nbsp;&nbsp;&nbsp;</block>
          </text>
          <!-- <p v-for="subitem in item" :key="subitem.id">{{ subitem.name }} ：{{ subitem.value }}</p> -->
        </div>
      </div>
      <div class="tools">
        <n-button type="primary" text @click="editItem(key, item)"> 修改 </n-button>
      </div>
    </div>

    <!-- <div class="view-list">
        <div class="content">
          <div class="name">绑定手机</div>
          <div class="desc">已绑定手机 ：{{ hidePhone(userStore.mobile) }}</div>
        </div>
        <div class="tools">
          <n-button type="primary" text @click="isShowChangeMobile = true"> 修改 </n-button>
        </div>
      </div>

      <div class="view-list">
        <div class="content">
          <div class="name">绑定邮箱</div>
          <div class="desc">已绑定邮箱 ：{{ userStore.email || '未设置' }}</div>
        </div>
        <div class="tools">
          <n-button type="primary" text @click="isShowChangeEmail = true"> 修改 </n-button>
        </div>
      </div> -->
  </div>
  <EditConfig v-model="isShowChangePassword" :formItems="configFormItems" />
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
.text-ellipsis {
  width: 750px; /* 调整这个宽度以适应大约10个字符 */
  white-space: nowrap; /* 确保文本不会换行 */
  overflow: hidden; /* 隐藏超出部分的文本 */
  text-overflow: ellipsis; /* 当文本超出容器宽度时显示省略号 */
}

</style>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NDatePicker, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ServeGetUserConfigGroup, ServeUpdateConfig } from '@/api/user'
import AvatarCropper from '@/components/base/AvatarCropper.vue'
import { hidePhone } from '@/utils/strings'
import { useUserStore } from '@/store'
import ws from '@/connect'

const userStore = useUserStore()
const router = useRouter()
const cropper = ref(false)

const detail = reactive({
  AUTOQA_AUTOREPLY: '0',
  WXOPENAI_TOKEN: '',
  WXOPENAI_ENCODINGAESKEY: '',
  WXOPENAI_APPID: '',
  WXOPENAI_MANAGERID: '',
  loading: false
})

const configMap = reactive({})

function reloadTable() {
  // 加载用户信息
ServeGetUserConfigGroup().then(({ data }) => {
  console.log('ServeGetUserConfigGroup', data)
  console.log('ServeGetUserConfigGroup', data['智能问答'])
  console.log('ServeGetUserConfigGroup', data['微信对话开放平台'])
  const qaSwich = data['智能问答']
  detail[qaSwich[0].key] = qaSwich[0].value === true ? '1' : '0'
  configMap[qaSwich[0].key] = qaSwich[0]
  const config = data['微信对话开放平台']
  for(let i=0; i<config.length; i++){
    configMap[config[i].key] = config[i]
    detail[config[i].key] = config[i].value
  }
  console.log('configMap', configMap)
  console.log('detail', detail)
})
}
reloadTable()
// 修改用户信息
const onChangeDetail = () => {
  console.log('detail', detail)
  
  if (!detail.WXOPENAI_TOKEN || !detail.WXOPENAI_ENCODINGAESKEY || !detail.WXOPENAI_APPID || !detail.WXOPENAI_MANAGERID) {
    return window['$message'].warning('必填项不能为空')
  }

  detail.loading = true
  const config = []
  for (const key in detail) {
    console.debug('key', key)
    console.debug('configMap[key]', configMap[key])
    console.debug('detail[key]', detail[key])
    const curTime = new Date().getTime()
    if(key !== 'loading'){
      if(key === 'AUTOQA_AUTOREPLY'){
        detail[key] = detail[key] === '1' ? 'true' : 'false'
        configMap[key].name = '智能问答-' + configMap[key].name
      }else{
        configMap[key].name = '微信对话开放平台-' + configMap[key].name
      }
      configMap[key].lastOperationTime = curTime
      const item = {
      recordId: configMap[key].id,
      fields: configMap[key]
    }
    item.fields.value = detail[key]
    delete item.fields.id
    config.push(item)
    }
  }

  console.log('config', config)
  
  const response = ServeUpdateConfig(config)

  response.then(() => {
    window['$message'].success('信息保存成功')

    const rawMsg = {app:'智能问答|qa', type: 'env', action: 'reload'}
    const payload = ws.formatMsgToCommand(rawMsg)
    ws.client.publish(ws.apis.commandApi, payload)
    
    // userStore.loadSetting()
    reloadTable()
  })

  response.catch(() => {
    window['$message'].warning('信息保存失败')
  })

  response.finally(() => {
    detail.loading = false
  })
}

</script>

<template>
  <h3 class="title">配置信息</h3>
  <div class="view-box">
    <section class="container el-container">

<main class="el-main" style="padding-right: 20px">
  <n-form
    ref="formRef"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    size="medium"
    style="max-width: 500px; margin-top: 25px"
  >
  <n-form-item label="自动问答：">
      <n-radio-group v-model:value="detail.AUTOQA_AUTOREPLY" name="AUTOQA_AUTOREPLY">
        <n-space>
          <n-radio key="1" value="1"> 开启 </n-radio>
          <n-radio key="0" value="0"> 关闭 </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Token：">
      <n-input
        placeholder="请输入微信对话平台token"
        v-model:value="detail.WXOPENAI_TOKEN"
        maxlength="20"
        show-count
      />
    </n-form-item>
    <n-form-item label="EncodingAESKey：">
      <n-input
        placeholder="请输入微信对话平台密钥"
        v-model:value="detail.WXOPENAI_ENCODINGAESKEY"
        maxlength="20"
        show-count
      />
    </n-form-item>
    <n-form-item label="APPID">
      <n-input
        placeholder="请输入微信对话平台APPID"
        v-model:value="detail.WXOPENAI_APPID"
        maxlength="20"
        show-count
      />
    </n-form-item>
    <n-form-item label="管理员ID">
      <n-input
        placeholder="请输入微信对话平台管理员ID"
        v-model:value="detail.WXOPENAI_MANAGERID"
        maxlength="20"
        show-count
      />
    </n-form-item>
    <n-form-item>
      <n-button
        type="primary"
        @click="onChangeDetail"
        :loading="detail.loading"
        style="margin-left: 94px"
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
  max-width: 100%;
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

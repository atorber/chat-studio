<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NDatePicker, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import { ServeUpdateUserDetail, ServeGetUserDetail } from '@/api/user'
import AvatarCropper from '@/components/base/AvatarCropper.vue'
import { hidePhone } from '@/utils/strings'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const router = useRouter()
const cropper = ref(false)

const detail = reactive({
  avatar: '',
  nickname: '',
  mobile: '',
  email: '',
  gender: '0',
  motto: '0',
  birthday: ref(),
  loading: false
})

// 加载用户信息
ServeGetUserDetail().then(({ data }) => {
  detail.nickname = data.nickname.toString()
  detail.mobile = data.mobile.toString()
  detail.email = data.email.toString()
  detail.gender = data.gender.toString()
  detail.motto = data.motto.toString()
  detail.avatar = data.avatar
  if (data.birthday) {
    detail.birthday = ref(data.birthday)
  }
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
  <h3 class="title">配置信息</h3>
  <div class="view-box">
    <section class="el-container container">

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
      <n-radio-group v-model:value="detail.gender" name="gender">
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

<script setup>
import { reactive, ref, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, NSwitch } from 'naive-ui'
import { ServeUpdateConfig } from '@/api/user'

const props = defineProps({
  modelValue: Boolean,
  formItems: Object  // 接收传入的 editItem
});

const emit = defineEmits(['update:modelValue', 'close'])

const formRef = ref()

let model = reactive()

const formModel = ref({});

watch(() => props.formItems, (newVal) => {
  console.log('newVal: ', newVal);
  if (newVal && Array.isArray(newVal.items)) {
    formModel.value = ref({});
    newVal.items.forEach(item => {
      if(item.value==='true'){
        formModel[item.key] = true;
      } else if(item.value==='false'){
        formModel[item.key] = false;
      } else {
        formModel[item.key] = item.value;
      }
    });
    console.log('formModel: ', formModel);
  }
}, { immediate: true });

const rules = {
  oldPassword: {
    required: true,
    trigger: ['blur', 'input'],
    message: '登录密码不能为空！'
  },
  newPassword: {
    required: true,
    trigger: ['blur', 'input'],
    message: '新密码不能为空！'
  },
  newPassword2: {
    required: true,
    trigger: ['blur', 'change'],
    validator(rule, value) {
      if (!value) {
        return new Error('确认密码不能为空！')
      } else if (model.newPassword != model.newPassword2) {
        return new Error('两次密码填写不一致！')
      }

      return true
    }
  }
}

const loading = ref(false)

const onSubmit = () => {
  loading.value = true
  console.log('model: ', formModel);
  for (const key in formModel) {
    if (Object.hasOwnProperty.call(formModel, key)) {
      const element = formModel[key];
      if (typeof element === 'boolean') {
        formModel[key] = element ? 'true' : 'false';
      }
      if (element === undefined) {
        formModel[key] = '';
      }
    }
}
  let response = ServeUpdateConfig(formModel)

  response.then((res) => {
    if (res.code == 200) {
      window['$message'].success('密码修改成功')
      emit('update:modelValue', false)
    } else {
      window['$message'].warning(res.message)
    }
  })

  response.finally(() => {
    loading.value = false
  })
}

const onValidate = (e) => {
  e.preventDefault()

  formRef.value.validate((errors) => {
    !errors && onSubmit()
  })
}
</script>

<template>
  <n-modal
    :show="modelValue"
    preset="card"
    :title="formItems.name"
    class="modal-radius"
    style="max-width: 400px"
    :on-update:show="
      (value) => {
        $emit('update:modelValue', value)
      }
    "
  > 

    <n-form ref="formRef" :model="formModel" :rules="rules">
      <n-form-item :label="item.name" path="item.key" v-for="item in formItems.items" 
    :key="item.key">
        <n-input v-if="typeof item.value!=='boolean'" :placeholder="item.desc" type="text" v-model:value="item.value" />
        <n-switch v-if="typeof item.value === 'boolean'" size="medium" v-model:value="item.value" />
      </n-form-item>

      <!-- <n-form-item label="登录密码" path="oldPassword">
        <n-input placeholder="请填写登录密码" type="password" v-model:value="model.oldPassword" />
      </n-form-item>

      <n-form-item label="设置新密码" path="newPassword">
        <n-input placeholder="请填写新密码" type="password" v-model:value="model.newPassword" />
      </n-form-item>

      <n-form-item label="确认新密码" path="newPassword2">
        <n-input
          placeholder="请再次填写新密码"
          type="password"
          v-model:value="model.newPassword2"
        />
      </n-form-item> -->
    </n-form>

    <template #footer>
      <div style="width: 100%; text-align: right">
        <n-button type="tertiary" @click="$emit('update:modelValue', false)"> 取消 </n-button>
        <n-button type="primary" class="mt-l15" :loading="loading" @click="onValidate">
          保存修改
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<style lang="less" scoped></style>

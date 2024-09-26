<template>
  <PageTitle title="自动问答" />
  <n-card :bordered="false" class="proCard">
    <!-- <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm> -->

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row: ListData) => row.recordId"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="125"
        class="py-4"
      >
        <n-form-item label="分类" path="skillname">
          <n-input placeholder="请输入问题分类" v-model:value="formParams.skillname" />
        </n-form-item>
        <n-form-item label="标准问题" path="title">
          <n-input type="textarea" placeholder="请输入标准问题" v-model:value="formParams.title" />
        </n-form-item>
        <n-form-item label="相似问题1" path="question1">
          <n-input
            type="textarea"
            placeholder="请输入相似问题1"
            v-model:value="formParams.question1"
          />
        </n-form-item>
        <n-form-item label="相似问题2" path="question2">
          <n-input
            type="textarea"
            placeholder="请输入相似问题2"
            v-model:value="formParams.question2"
          />
        </n-form-item>
        <n-form-item label="相似问题3" path="question3">
          <n-input
            type="textarea"
            placeholder="请输入相似问题3"
            v-model:value="formParams.question3"
          />
        </n-form-item>
        <n-form-item label="机器人回答" path="answer">
          <n-input
            type="textarea"
            placeholder="请输入机器人回答"
            v-model:value="formParams.answer"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { BasicTable, TableAction } from '@/components/Table'
import { BasicForm, FormSchema, useForm } from '@/components/Form/index'
import { ServeGetQas, ServeDeleteQas, ServeCreateQas } from '@/api/qa'

import { columns, ListData } from './columns'
import { PlusOutlined } from '@vicons/antd'
import { useRouter } from 'vue-router'
import { type FormRules } from 'naive-ui'
import { NForm, NFormItem, NSwitch, NPopconfirm, NDatePicker, NCard } from 'naive-ui'
import PageTitle from '@/layout/PageTitle.vue'

const rules: FormRules = {
  skillname: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入问题分类'
  },
  title: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入标准答案'
  },
  answer: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入机器人回答'
  }
}

const schemas: FormSchema[] = [
  {
    field: 'name',
    labelMessage: '这是一个提示',
    component: 'NInput',
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名',
      onInput: (e: any) => {
        console.log(e)
      }
    },
    rules: [{ required: true, message: '请输入姓名', trigger: ['blur'] }]
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号码',
      showButton: false,
      onInput: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'type',
    component: 'NSelect',
    label: '类型',
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '舒适性',
          value: 1
        },
        {
          label: '经济性',
          value: 2
        }
      ],
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeDate',
    component: 'NDatePicker',
    label: '预约时间',
    defaultValue: 1183135260000,
    componentProps: {
      type: 'date',
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeTime',
    component: 'NTimePicker',
    label: '停留时间',
    componentProps: {
      clearable: true,
      onUpdateValue: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'status',
    label: '状态',
    //插槽
    slot: 'statusSlot'
  },
  {
    field: 'makeProject',
    component: 'NCheckbox',
    label: '预约项目',
    componentProps: {
      placeholder: '请选择预约项目',
      options: [
        {
          label: '种牙',
          value: 1
        },
        {
          label: '补牙',
          value: 2
        },
        {
          label: '根管',
          value: 3
        }
      ],
      onUpdateChecked: (e: any) => {
        console.log(e)
      }
    }
  },
  {
    field: 'makeSource',
    component: 'NRadioGroup',
    label: '来源',
    componentProps: {
      options: [
        {
          label: '网上',
          value: 1
        },
        {
          label: '门店',
          value: 2
        }
      ],
      onUpdateChecked: (e: any) => {
        console.log(e)
      }
    }
  }
]

const router = useRouter()
const formRef: any = ref(null)
const actionRef = ref()

const showModal = ref(false)
const formBtnLoading = ref(false)
const formParams = reactive({
  skillname: '',
  title: '',
  question1: '',
  question2: '',
  question3: '',
  answer: ''
})

const actionColumn = reactive({
  width: 80,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list']
        }
        // {
        //   label: '编辑',
        //   onClick: handleEdit.bind(null, record),
        //   ifShow: () => {
        //     return true
        //   },
        //   auth: ['basic_list']
        // }
      ],
      // dropDownActions: [
      //   {
      //     label: '启用',
      //     key: 'enabled',
      //     // 根据业务控制是否显示: 非enable状态的不显示启用按钮
      //     ifShow: () => {
      //       return true
      //     }
      //   },
      //   {
      //     label: '禁用',
      //     key: 'disabled',
      //     ifShow: () => {
      //       return true
      //     }
      //   }
      // ],
      select: (key) => {
        window['$message'].info(`您点击了，${key} 按钮`)
      }
    })
  }
})

const [register, { getFieldsValue }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas
})

function addTable() {
  showModal.value = true
}

const loadDataTable = async (res) => {
  console.log('res', { ...getFieldsValue(), ...res })
  const { data } = await ServeGetQas({ ...getFieldsValue(), ...res })
  console.log('data', JSON.stringify(data))
  return data
}

function onCheckedRow(rowKeys) {
  console.log(rowKeys)
}

function reloadTable() {
  actionRef.value.reload()
}

function confirmForm(e) {
  e.preventDefault()
  formBtnLoading.value = true
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const res = await ServeCreateQas(formParams)
      console.log('新建res', res)
      window['$message'].success('新建成功')
      setTimeout(() => {
        showModal.value = false
        reloadTable()
      })
    } else {
      window['$message'].error('请填写完整信息')
    }
    formBtnLoading.value = false
  })
}

function handleEdit(record: Recordable) {
  console.log('点击了编辑', record)
  router.push({ name: 'basic-info', params: { id: record.id } })
}

async function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
  const res = await ServeDeleteQas({ recordId: record.recordId })
  console.log('删除res', res)
  if (res.code === 200) {
    window['$message'].success('删除成功')
    reloadTable()
  } else {
    window['$message'].error('删除失败')
  }
}

function handleSubmit(values: Recordable) {
  console.log(values)
  reloadTable()
}

function handleReset(values: Recordable) {
  console.log(values)
}
</script>

<style lang="less" scoped>
.el-header {
  height: 60px;
  line-height: 60px;
  padding-left: 15px;
  font-size: 18px;
  -webkit-app-region: drag;
}
.background-color {
  background: #f5f7f9;
}
.n-dialog.n-modal {
  width: 50%;
  max-width: calc(100vw - 32px);
}
</style>

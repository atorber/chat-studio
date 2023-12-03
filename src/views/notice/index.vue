<template>
  <PageTitle title="定时提醒" />
  <n-card :bordered="false" class="proCard">
    <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row: ListData) => row.id"
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
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input type="textarea" placeholder="请输入地址" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="日期" path="date">
          <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formParams.date" />
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
import { getTableList } from '@/api/table/list'
import { columns, ListData } from './columns'
import { PlusOutlined } from '@vicons/antd'
import { useRouter } from 'vue-router'
import { type FormRules } from 'naive-ui'
import { NForm, NFormItem, NSwitch, NPopconfirm, NDatePicker, NCard } from 'naive-ui'
import PageTitle from '@/layout/PageTitle.vue'

const rules: FormRules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  },
  address: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入地址'
  },
  date: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择日期'
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
  name: '',
  address: '',
  date: null
})

const actionColumn = reactive({
  width: 220,
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
        },
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true
          },
          auth: ['basic_list']
        }
      ],
      dropDownActions: [
        {
          label: '启用',
          key: 'enabled',
          // 根据业务控制是否显示: 非enable状态的不显示启用按钮
          ifShow: () => {
            return true
          }
        },
        {
          label: '禁用',
          key: 'disabled',
          ifShow: () => {
            return true
          }
        }
      ],
      select: (key) => {
        window['$message'].info(`您点击了，${key} 按钮`)
      }
    })
  }
})

const [register] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas
})

function addTable() {
  showModal.value = true
}

const loadDataTable = async (_res) => {
  // return await getTableList({ ...getFieldsValue(), ...res });

  return {
    "page":1,
    "pageSize":10,
    "pageCount":60,
    "itemCount":600,
    "list":[
        {
            "id":853349,
            "beginTime":"2002-04-11 21:59:56",
            "endTime":"1988-01-11 03:49:19",
            "address":"廊坊市",
            "name":"金丽",
            "avatar":"http://dummyimage.com/400x400/79ccf2/f0f279&text=Susan",
            "date":"1994-06-08",
            "time":"00:11",
            "no":4176237,
            "status":true
        },
        {
            "id":158023,
            "beginTime":"2008-05-26 19:27:55",
            "endTime":"2002-11-12 09:35:37",
            "address":"汉中市",
            "name":"林军",
            "avatar":"http://dummyimage.com/400x400/d079f2/79f2ad&text=Sandra",
            "date":"2014-03-19",
            "time":"05:39",
            "no":7337022,
            "status":false
        },
        {
            "id":260065,
            "beginTime":"2009-09-12 12:48:17",
            "endTime":"1976-07-08 05:04:47",
            "address":"毕节市",
            "name":"锺敏",
            "avatar":"http://dummyimage.com/400x400/f28a79/798bf2&text=Daniel",
            "date":"2010-06-23",
            "time":"04:43",
            "no":8146502,
            "status":true
        },
        {
            "id":283066,
            "beginTime":"1972-10-24 13:39:56",
            "endTime":"2004-04-03 14:10:38",
            "address":"海外",
            "name":"范静",
            "avatar":"http://dummyimage.com/400x400/aef279/f279d1&text=Donna",
            "date":"1993-09-13",
            "time":"12:48",
            "no":2482337,
            "status":true
        },
        {
            "id":28263,
            "beginTime":"2012-11-27 13:42:26",
            "endTime":"2022-09-14 17:22:19",
            "address":"鹤壁市",
            "name":"夏丽",
            "avatar":"http://dummyimage.com/400x400/79f2ef/f2cb79&text=Deborah",
            "date":"2017-12-03",
            "time":"09:25",
            "no":5821656,
            "status":false
        },
        {
            "id":108505,
            "beginTime":"1980-03-12 17:35:16",
            "endTime":"1975-06-05 00:54:32",
            "address":"湖州市",
            "name":"田娜",
            "avatar":"http://dummyimage.com/400x400/a879f2/79f285&text=Donna",
            "date":"1985-03-22",
            "time":"07:05",
            "no":1963024,
            "status":true
        },
        {
            "id":985346,
            "beginTime":"1996-07-16 19:59:46",
            "endTime":"2018-07-21 16:30:39",
            "address":"绍兴市",
            "name":"苏娜",
            "avatar":"http://dummyimage.com/400x400/f27990/79b3f2&text=Kenneth",
            "date":"2021-12-20",
            "time":"15:08",
            "no":609904,
            "status":false
        },
        {
            "id":635879,
            "beginTime":"2007-11-04 20:06:20",
            "endTime":"1982-03-22 21:48:44",
            "address":"临沧市",
            "name":"史敏",
            "avatar":"http://dummyimage.com/400x400/d7f279/ea79f2&text=Kevin",
            "date":"2013-06-26",
            "time":"09:50",
            "no":1549986,
            "status":true
        },
        {
            "id":240535,
            "beginTime":"1974-08-21 11:30:25",
            "endTime":"1995-07-16 20:36:19",
            "address":"荆门市",
            "name":"孟艳",
            "avatar":"http://dummyimage.com/400x400/79f2c6/f2a379&text=Kenneth",
            "date":"1976-03-07",
            "time":"08:40",
            "no":9542516,
            "status":true
        },
        {
            "id":122280,
            "beginTime":"1985-10-24 12:42:23",
            "endTime":"2010-05-11 03:14:18",
            "address":"离岛",
            "name":"陈秀英",
            "avatar":"http://dummyimage.com/400x400/7f79f2/95f279&text=Frank",
            "date":"1996-12-05",
            "time":"04:42",
            "no":9664492,
            "status":true
        }
    ]
}
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
  formRef.value.validate((errors) => {
    if (!errors) {
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

function handleDelete(record: Recordable) {
  console.log('点击了删除', record)
  window['$message'].info('点击了删除')
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
</style>

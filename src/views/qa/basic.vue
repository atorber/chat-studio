<template>
  <n-card :bordered="false" class="proCard">
    <BasicTable
      title="表格列表"
      titleTooltip="这是一个提示"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :scroll-x="1360"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
import { reactive, ref, h } from 'vue'
import { BasicTable, TableAction } from '@/components/Table'
// import { getTableList } from '@/api/table/list';
import { columns } from './basicColumns'
import { useDialog, useMessage } from 'naive-ui'
import { DeleteOutlined, EditOutlined } from '@vicons/antd'

const message = useMessage()
const dialog = useDialog()
const actionRef = ref()

const params = reactive({
  pageSize: 5,
  name: 'xiaoMa'
})

const actionColumn = reactive({
  width: 150,
  title: '操作',
  key: 'action',
  fixed: 'right',
  align: 'center',
  render(record) {
    return h(TableAction as any, {
      style: 'text',
      actions: createActions(record)
    })
  }
})

function createActions(record) {
  return [
    {
      label: '删除',
      type: 'error',
      // 配置 color 会覆盖 type
      color: 'red',
      icon: DeleteOutlined,
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
      type: 'primary',
      icon: EditOutlined,
      onClick: handleEdit.bind(null, record),
      ifShow: () => {
        return true
      },
      auth: ['basic_list']
    }
  ]
}

const loadDataTable = (res) => {
  // return await getTableList({ ...params, ...res });
  return {
    page: 1,
    pageSize: 10,
    pageCount: 30,
    itemCount: 300,
    list: [
      {
        id: 921037,
        beginTime: '1975-03-21 09:47:08',
        endTime: '2006-12-09 03:12:11',
        address: '牡丹江市',
        name: '蒋静',
        avatar: 'http://dummyimage.com/400x400/79a8f2/ccf279&text=Kevin',
        date: '2001-07-22',
        time: '13:45',
        no: 2121676,
        status: true
      },
      {
        id: 97378,
        beginTime: '1970-01-21 02:53:47',
        endTime: '1981-04-24 10:44:30',
        address: '张家界市',
        name: '刘磊',
        avatar: 'http://dummyimage.com/400x400/f279ef/79f2d1&text=Brenda',
        date: '1974-06-26',
        time: '09:30',
        no: 5654557,
        status: true
      },
      {
        id: 629503,
        beginTime: '1997-09-02 12:01:20',
        endTime: '1976-02-08 18:39:43',
        address: '三亚市',
        name: '方磊',
        avatar: 'http://dummyimage.com/400x400/f2ae79/8a79f2&text=Sharon',
        date: '1981-12-30',
        time: '02:00',
        no: 8907808,
        status: true
      },
      {
        id: 94327,
        beginTime: '1984-10-04 01:34:14',
        endTime: '1995-10-17 18:17:10',
        address: '天津市',
        name: '陈勇',
        avatar: 'http://dummyimage.com/400x400/8af279/f279ad&text=Jason',
        date: '1988-02-10',
        time: '05:02',
        no: 534553,
        status: true
      },
      {
        id: 260569,
        beginTime: '1971-12-21 18:01:55',
        endTime: '1988-01-12 18:29:50',
        address: '固原市',
        name: '崔静',
        avatar: 'http://dummyimage.com/400x400/79d1f2/f2ef79&text=Jason',
        date: '2001-06-16',
        time: '06:24',
        no: 2537615,
        status: true
      },
      {
        id: 665661,
        beginTime: '1992-10-15 04:27:48',
        endTime: '1982-04-15 19:24:53',
        address: '宁波市',
        name: '叶平',
        avatar: 'http://dummyimage.com/400x400/cc79f2/79f2a9&text=Mary',
        date: '1995-01-25',
        time: '12:10',
        no: 5028264,
        status: false
      },
      {
        id: 839445,
        beginTime: '2016-12-07 16:48:37',
        endTime: '1984-06-18 18:31:38',
        address: '汉中市',
        name: '丁丽',
        avatar: 'http://dummyimage.com/400x400/f28579/798ff2&text=Deborah',
        date: '2001-07-26',
        time: '06:46',
        no: 1023610,
        status: true
      },
      {
        id: 886144,
        beginTime: '1974-08-18 06:49:16',
        endTime: '2011-05-14 17:51:57',
        address: '甘孜藏族自治州',
        name: '许敏',
        avatar: 'http://dummyimage.com/400x400/b3f279/f279d6&text=Robert',
        date: '1996-03-16',
        time: '15:33',
        no: 8473743,
        status: false
      },
      {
        id: 759280,
        beginTime: '2001-09-03 18:31:20',
        endTime: '1994-04-11 08:58:20',
        address: '衡水市',
        name: '刘艳',
        avatar: 'http://dummyimage.com/400x400/79f2ea/f2c779&text=Paul',
        date: '2014-12-31',
        time: '11:21',
        no: 7516071,
        status: false
      },
      {
        id: 101531,
        beginTime: '2023-06-11 14:14:00',
        endTime: '2018-02-25 19:22:57',
        address: '资阳市',
        name: '丁伟',
        avatar: 'http://dummyimage.com/400x400/a379f2/79f280&text=Brenda',
        date: '1971-04-12',
        time: '01:08',
        no: 1494838,
        status: true
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

function handleDelete(record) {
  console.log(record)
  dialog.info({
    title: '提示',
    content: `您想删除${record.name}`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除成功')
    },
    onNegativeClick: () => {}
  })
}

function handleEdit(record) {
  console.log(record)
  message.success('您点击了编辑按钮')
}
</script>

<style lang="less" scoped></style>

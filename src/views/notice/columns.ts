import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  alias: string
  id: string
  name: string
  type: string
  desc: string
  time: number
  cycle: string
  state: string
  syncStatus: string
  lastOperationTime: number
  recordId: string
}
export const columns: BasicColumn<ListData>[] = [
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 150,
  // },
  {
    title: '内容',
    key: 'desc',
    width: 300,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
  },
  {
    title: '昵称/群名称',
    key: 'name',
    width: 100,
  },
  {
    title: '好友ID/群ID',
    key: 'id',
    width: 100,
  },
  {
    title: '好友备注',
    key: 'alias',
    width: 100,
  },
  {
    title: '周期',
    key: 'cycle',
    width: 100,
  },
  {
    title: '状态',
    key: 'state',
    width: 100,
  },
  {
    title: '同步状态',
    key: 'syncStatus',
    width: 100,
  },
  {
    title: '更新时间',
    key: 'lastOperationTime',
    width: 160,
    render(row) {
      return new Date(row.lastOperationTime as number).toLocaleString();
    },
  }
];
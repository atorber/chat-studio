import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  text: string; // 内容
  type: string; // 类型
  alias: string; // 好友备注(选填)
  name: string; // 昵称/群名称
  id: string; // 好友ID/群ID(选填)
  state: string; // 状态
  pubTime: string; // 发送时间
  info: string; // 信息
  syncStatus: string; // 同步状态
  lastOperationTime: string; // 最后操作时间
  action: string; // 操作
  recordId: string; // 记录ID
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'id',
    width: 100,
  },
  {
    title: '内容',
    key: 'text',
    width: 200,
  },
  {
    title: '类型',
    key: 'type',
    width: 160,
  },
  {
    title: '好友备注',
    key: 'alias',
    width: 150,
  },
  {
    title: '昵称/群名称',
    key: 'name',
    width: 160,
  },
  {
    title: '好友ID/群ID',
    key: 'id',
    width: 160,
  },
  {
    title: '状态',
    key: 'state',
    width: 160,
  },
  {
    title: '发送时间',
    key: 'pubTime',
    width: 160,
    render(row) {
      return new Date(row.pubTime).toLocaleString();
    },
  },
  {
    title: '备注信息',
    key: 'info',
    width: 100,
  },
  {
    title: '状态',
    key: 'state',
    width: 160,
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
      return new Date(row.lastOperationTime).toLocaleString();
    },
  }
];
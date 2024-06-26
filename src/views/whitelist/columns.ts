import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  serialNumber: string; // 定义名字属性，可选
  app: string;
  type: string;
  name: string;
  id: string;
  alias: string;
  info: string;
  state: string;
  quota: number;
  adminName: string;
  adminAlias: string;
  adminId: string;

  syncStatus: string;
  lastOperationTime: number;
  action: string;
}
export const columns: BasicColumn<ListData>[] = [
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 150,
  // },
  {
    title: '编号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '所属应用',
    key: 'app',
    width: 150,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
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
    title: '好友备注',
    key: 'alias',
    width: 160,
  },
  {
    title: '配额',
    key: 'qupta',
    width: 160,
  },
  {
    title: '备注说明',
    key: 'info',
    width: 160,
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
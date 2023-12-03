import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  _id?: string; // 定义名字属性，可选
  type?: string;
  startTime: number;
  duration?: number;
  maximum?: number;
  cycle?: number;
  topic?: string;
  roomid?: string;
  state?: string;
  syncStatus?: string;
  lastOperationTime: string;
  action?: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'recordId',
    width: 150,
  },
  {
    title: '编号',
    key: '_id',
    width: 50,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
  },
  {
    title: '描述',
    key: 'desc',
    width: 200,
  },
  {
    title: '开始时间',
    key: 'startTime',
    width: 160,
    render(row) {
      return new Date(row.startTime || 0).toLocaleString();
    },
  },
  {
    title: '时长',
    key: 'duration',
    width: 100,
  },
  {
    title: '限制人数',
    key: 'maximum',
    width: 100,
  },
  {
    title: '周期',
    key: 'cycle',
    width: 100,
  },
  {
    title: '关联群名称',
    key: 'topic',
    width: 100,
  },
  {
    title: '关联群ID',
    key: 'roomid',
    width: 100,
  },
  {
    title: '状态',
    key: 'active',
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
      return new Date(row.lastOperationTime).toLocaleString();
    },
  }
];
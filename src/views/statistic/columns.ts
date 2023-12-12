import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';

// 活动统计
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
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 150,
  // },
  {
    title: '编号',
    key: '_id',
    width: 150,
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

// 白名单
export interface ListDataWhiteList {
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
export const columnsWhiteList: BasicColumn<ListData>[] = [
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

// 订单
export interface ListDataOrder {
  serialNumber: string; // 定义名字属性，可选
  code: string;
  desc: string;
  name: string;
  alias: string;
  wxid: string;
  topic: string;
  createdAt: string;
  info: string;
  recordId: string;
}
export const columnsOrder: BasicColumn<ListData>[] = [
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 150,
  // },
  {
    title: '流水号',
    key: 'serialNumber',
    width: 100,
  },
  {
    title: '活动编号',
    key: 'code',
    width: 100,
  },
  {
    title: '描述',
    key: 'desc',
    width: 200,
  },
  {
    title: '昵称',
    key: 'name',
    width: 150,
  },
  {
    title: '备注名称',
    key: 'alias',
    width: 100,
  },
  {
    title: '微信ID',
    key: 'wxid',
    width: 100,
  },
  {
    title: '群名称',
    key: 'topic',
    width: 100,
  },
  {
    title: '备注信息',
    key: 'info',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 160,
    render(row) {
      return new Date(row.createdAt).toLocaleString();
    },
  }
];

import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
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
export const columns: BasicColumn<ListData>[] = [
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
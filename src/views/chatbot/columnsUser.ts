import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string; // 定义名字属性，可选
  botname: string;
  wxid: string;
  name: string;
  prompt: string;
  quota: string;
  state: string;
  info: string;
  recordId?: string;
}
export const columns: BasicColumn<ListData>[] = [
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 120,
  // },
  {
    title: '用户名称',
    key: 'name',
    width: 100,
  },
  {
    title: '备注名称',
    key: 'alias',
    width: 200,
  },
  {
    title: '用户ID',
    key: 'wxid',
    width: 200,
  },
  
  {
    title: '机器人ID',
    key: 'id',
    width: 100,
  },
  {
    title: '机器人名称',
    key: 'botname',
    width: 100,
  },
  {
    title: '用户提示词',
    key: 'prompt',
    width: 200,
  },
  {
    title: '配额',
    key: 'quota',
    width: 100,
  },
  {
    title: '启动状态',
    key: 'state',
    width: 160,
  },
  {
    title: '备注',
    key: 'info',
    width: 160,
  }
];
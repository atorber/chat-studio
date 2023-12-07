import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string; // 定义名字属性，可选
  name: string;
  desc: string;
  type: string;
  model: string;
  prompt: string;
  quota: string;
  endpoint: string;
  key: string;
  recordId?: string;
}
export const columns: BasicColumn<ListData>[] = [
  // {
  //   title: '序号',
  //   key: 'recordId',
  //   width: 120,
  // },
  {
    title: '机器人ID',
    key: 'id',
    width: 100,
  },
  {
    title: '描述',
    key: 'desc',
    width: 200,
  },
  {
    title: '类型',
    key: 'type',
    width: 100,
  },
  {
    title: '模型',
    key: 'model',
    width: 100,
  },
  {
    title: '系统提示词',
    key: 'prompt',
    width: 200,
  },
  {
    title: '配额',
    key: 'quota',
    width: 100,
  },
  {
    title: '接入点',
    key: 'endpoint',
    width: 160,
  },
  {
    title: '密钥',
    key: 'key',
    width: 160,
  }
];
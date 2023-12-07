import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  name?: string; // 定义名字属性，可选
  desc?: string;
  type?: string;
  details?: number;
  recordId?: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'recordId',
    width: 150,
  },
  {
    title: '类型',
    key: 'type',
    width: 200,
  },
  {
    title: '关键词',
    key: 'name',
    width: 200,
  },
  {
    title: '说明',
    key: 'desc',
    width: 200,
  },
  {
    title: '详细说明',
    key: 'details',
    width: 200,
  }
];
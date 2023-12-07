import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  skillname?: string; // 定义名字属性，可选
  title?: string;
  question1?: string;
  question2?: number;
  answer?: string;
  state?: string;
  syncStatus?: string;
  lastOperationTime: string;
  action?: string;
  recordId?: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'recordId',
    width: 150,
  },
  {
    title: '分类',
    key: 'skillname',
    width: 100,
  },
  {
    title: '标准问题',
    key: 'title',
    width: 200,
  },
  {
    title: '相似问题1',
    key: 'question1',
    width: 200,
  },
  {
    title: '相似问题2',
    key: 'question2',
    width: 200,
  },
  {
    title: '回答内容',
    key: 'answer',
    width: 160,
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
      return new Date(row.lastOperationTime).toLocaleString();
    },
  }
];
import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string;
  name: string;
  avatar: string;
  address: string;
  beginTime: string;
  endTime: string;
  date: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: '序号',
    key: 'id',
    width: 100,
  },
  {
    title: '所属应用',
    key: 'name',
    width: 100,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '类型',
    key: 'address',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 150,
  },
  {
    title: '昵称/群名称',
    key: 'beginTime',
    width: 160,
  },
  {
    title: '好友ID/群ID',
    key: 'endTime',
    width: 160,
  },
  {
    title: '好友备注',
    key: 'endTime',
    width: 160,
  },
  {
    title: '创建时间',
    key: 'date',
    width: 100,
  },
];
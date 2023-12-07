import { get } from '@/utils/request'

// 获取好友列表服务接口
export const ServeGetGroupnotices = (data) => {
  return get('/api/v1/groupnotice/list', data)
}
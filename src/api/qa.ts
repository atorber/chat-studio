import { get } from '@/utils/request'

// 获取好友列表服务接口
export const ServeGetQas = (data) => {
  return get('/api/v1/qa/list', data)
}
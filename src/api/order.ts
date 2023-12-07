import { get } from '@/utils/request'

// 获取好友列表服务接口
export const ServeGetOrders = (data) => {
  return get('/api/v1/order/list', data)
}
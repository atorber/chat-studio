import { get, post } from '@/utils/request'

// 获取订单列表服务接口
export const ServeGetOrders = (data) => {
  return get('/api/v1/order/list', data)
}

// 创建订单服务接口
export const ServeCreateOrders = (data) => {
  return post('/api/v1/order/create', data)
}

// 删除订单服务接口
export const ServeDeleteOrders = (data) => {
  return post('/api/v1/order/delete', data)
}
import { get, post } from '@/utils/request'

// 获取好友列表服务接口
export const ServeGetStatistics = (data) => {
  return get('/api/v1/statistic/list', data)
}

// 创建好友服务接口
export const ServeCreateStatistics = (data) => {
  return post('/api/v1/statistic/create', data)
}

// 删除好友服务接口
export const ServeDeleteStatistics = (data) => {
  return post('/api/v1/statistic/delete', data)
}
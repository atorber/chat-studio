import { get } from '@/utils/request'

// 获取好友列表服务接口
export const ServeGetStatistics = (data) => {
  return get('/api/v1/statistic/list', data)
}
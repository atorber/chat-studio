import { get, post } from '@/utils/request'

// 获取群发列表服务接口
export const ServeGetGroupnotices = (data) => {
  return get('/api/v1/groupnotice/list', data)
}

// 创建群发任务列表服务接口
export const ServeCreateGroupnotices = (data) => {
  return post('/api/v1/groupnotice/create', data)
}

// 删除群发任务列表服务接口
export const ServeDeleteGroupnotices = (data) => {
  return post('/api/v1/groupnotice/delete', data)
}
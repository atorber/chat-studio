import { get, post } from '@/utils/request'

// 获取定时任务列表服务接口
export const ServeGetNotices = (data) => {
  return get('/api/v1/notice/list', data)
}

// 创建定时任务服务接口
export const ServeCreateNotices = (data) => {
  return post('/api/v1/notice/create', data)
}

// 删除定时任务服务接口
export const ServeDeleteNotices = (data) => {
  return post('/api/v1/notice/delete', data)
}
import { get, post } from '@/utils/request'

// 获取关键词列表服务接口
export const ServeGetKeywords = (data) => {
  return get('/api/v1/keyword/list', data)
}

// 创建关键词服务接口
export const ServeCreateKeywords = (data) => {
  return post('/api/v1/keyword/create', data)
}

// 删除关键词服务接口
export const ServeDeleteKeywords = (data) => {
  return post('/api/v1/keyword/delete', data)
}
import { get, post } from '@/utils/request'

// 获取问答列表服务接口
export const ServeGetQas = (data) => {
  return get('/api/v1/qa/list', data)
}

// 创建问答服务接口
export const ServeCreateQas = (data) => {
  return post('/api/v1/qa/create', data)
}

// 删除问答服务接口
export const ServeDeleteQas = (data) => {
  return post('/api/v1/qa/delete', data)
}

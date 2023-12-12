import { get, post } from '@/utils/request'

// 获取白名单列表服务接口
export const ServeGetWhitelistWhite = (data) => {
  return get('/api/v1/whitelist/list/white', data)
}

// 创建黑名单列表服务接口
export const ServeCreateWhitelistWhite = (data) => {
  return post('/api/v1/whitelist/list/white/create', data)
}

// 删除黑名单列表服务接口
export const ServeDeleteWhitelistWhite = (data) => {
  return post('/api/v1/whitelist/list/white/delete', data)
}

// 获取黑名单列表服务接口
export const ServeGetWhitelistBlack = (data) => {
    return get('/api/v1/whitelist/list/black', data)
  }
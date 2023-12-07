import { get } from '@/utils/request'

// 获取白名单列表服务接口
export const ServeGetWhitelistWhite = (data) => {
  return get('/api/v1/whitelist/list/white', data)
}

// 获取黑名单列表服务接口
export const ServeGetWhitelistBlack = (data) => {
    return get('/api/v1/whitelist/list/black', data)
  }
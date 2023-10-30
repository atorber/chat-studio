import { storage } from './storage'

const AccessToken = 'AUTH_TOKEN'

/**
 * 获取登录授权 Token
 *
 * @returns token
 */
export function getAccessToken() {
  return storage.get(AccessToken) || ''
}

/**
 * 验证是否登录
 *
 * @returns token
 */
export function isLoggedIn() {
  return getAccessToken() !== ''
}

/**
 * 设置登录授权 Token
 *
 * @returns token
 */
export function setAccessToken(token = '', expire = 60 * 60 * 2) {
  return storage.set(AccessToken, token, expire) || ''
}


/**
 * 删除登录授权 Token
 */
export function delAccessToken() {
  storage.remove(AccessToken)
}

/**
 * 设维格表授权 token 和 namespace
 *
 * @returns token
 */
export function setVikaToken(token = {}, expire = 60 * 60 * 2) {
  console.debug('setVikaToken', token)
  return storage.set('VikaToken', token, expire) || ''
}

export function getVikaToken() {
  return storage.get('VikaToken') || ''
}

import { ServeLoginVika } from './auth-service'

// 授权相关接口
import { post } from '@/utils/request'

// 登录服务接口
export const ServeLogin = data => post('/api/v1/auth/login', data)
export const ServeLogin2 = data => ServeLoginVika(data)

// 注册服务接口
export const ServeRegister = data => post('/api/v1/auth/register', data)

// 退出登录服务接口
export const ServeLogout = data => post('/api/v1/auth/logout', data)

// 刷新登录Token服务接口
export const ServeRefreshToken = () => post('/api/v1/auth/refresh-token')

// 找回密码服务
export const ServeForgetPassword = data => post('/api/v1/auth/forget', data)

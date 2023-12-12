import { get,post } from '@/utils/request'

// 获取聊天机器人列表服务接口
export const ServeGetChatbots = (data) => {
  return get('/api/v1/chatbot/list', data)
}

// 创建聊天机器人服务接口
export const ServeCreateChatbots = (data) => {
  return post('/api/v1/chatbot/create', data)
}

// 删除聊天机器人服务接口
export const ServeDeleteChatbots = (data) => {
  return post('/api/v1/chatbot/delete', data)
}

// 获取机器人用户列表服务接口
export const ServeGetChatbotUsers = (data) => {
  return get('/api/v1/chatbot/user/list', data)
}

// 创建机器人用户服务接口
export const ServeCreateChatbotUsers = (data) => {
  return post('/api/v1/chatbot/user/create', data)
}

// 删除机器人用户服务接口
export const ServeDeleteChatbotUsers = (data) => {
  return post('/api/v1/chatbot/user/delete', data)
}
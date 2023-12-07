import { get } from '@/utils/request'

// 获取聊天机器人列表服务接口
export const ServeGetChatbots = (data) => {
  return get('/api/v1/chatbot/list', data)
}

// 获取好友列表服务接口
export const ServeGetChatbotUsers = (data) => {
  return get('/api/v1/chatbot/user/list', data)
}
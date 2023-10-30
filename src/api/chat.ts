import { post, get, upload } from '@/utils/request'
import { ServeGetTalkListVika, ServeTalkRecordsVika, ServePublishMessageVika } from './chat-service'

// 聊天列表创建服务接口
export const ServeCreateTalkList = (data = {}) => post('/api/v1/talk/create', data)

// 删除聊天列表服务接口
export const ServeDeleteTalkList = (data = {}) => post('/api/v1/talk/delete', data)

// 对话列表置顶服务接口
export const ServeTopTalkList = (data = {}) => post('/api/v1/talk/topping', data)

// 清除聊天消息未读数服务接口
export const ServeClearTalkUnreadNum = (data = {}) => post('/api/v1/talk/unread/clear', data)

// 获取转发会话记录详情列表服务接口
export const ServeGetForwardRecords = (data = {}) => get('/api/v1/talk/records/forward', data)

// 对话列表置顶服务接口
export const ServeSetNotDisturb = (data = {}) => post('/api/v1/talk/disturb', data)

// 查找用户聊天记录服务接口
export const ServeFindTalkRecords = (data = {}) => get('/api/v1/talk/records/history', data)

// 搜索用户聊天记录服务接口
export const ServeSearchTalkRecords = (data = {}) => get('/api/v1/talk/search-chat-records', data)

export const ServeGetRecordsContext = (data = {}) => get('/api/v1/talk/get-records-context', data)

// 发送消息服务接口
export const ServePublishMessage1 = (data = {}) => post('/api/v1/talk/message/publish', data)

export const ServePublishMessage = (data = {}) => ServePublishMessageVika(data)

// 发送文本消息服务接口
export const ServeSendTalkText = (data = {}) => post('/api/v1/talk/message/text', data)

// 发送代码块消息服务接口
export const ServeSendTalkCodeBlock = (data = {}) => post('/api/v1/talk/message/code', data)

// 发送聊天文件服务接口
export const ServeSendTalkFile = (data = {}) => post('/api/v1/talk/message/file', data)

// 发送聊天图片服务接口
export const ServeSendTalkImage = (data = {}) => upload('/api/v1/talk/message/image', data)

// 发送表情包服务接口
export const ServeSendEmoticon = (data = {}) => post('/api/v1/talk/message/emoticon', data)

// 转发消息服务接口
export const ServeForwardRecords = (data = {}) => post('/api/v1/talk/message/forward', data)

// 撤回消息服务接口
export const ServeRevokeRecords = (data = {}) => post('/api/v1/talk/message/revoke', data)

// 删除消息服务接口
export const ServeRemoveRecords = (data = {}) => post('/api/v1/talk/message/delete', data)

// 收藏表情包服务接口
export const ServeCollectEmoticon = (data = {}) => post('/api/v1/talk/message/collect', data)

// 发送投票消息服务接口
export const ServeSendVote = (data = {}) => post('/api/v1/talk/message/vote', data)

// 投票消息处理服务接口
export const ServeConfirmVoteHandle = (data = {}) => post('/api/v1/talk/message/vote/handle', data)

// 获取聊天列表服务接口
export const ServeGetTalkList1 = (data = {}) => get('/api/v1/talk/list', data)

// 获取好友列表服务接口
export const ServeGetTalkList = (data = {}) => ServeGetTalkListVika(data)

// 获取聊天记录服务接口
export const ServeTalkRecords1 = (data = {}) => get('/api/v1/talk/records', data)

// 搜索用户信息服务接口
export const ServeTalkRecords = (data = {}) => ServeTalkRecordsVika(data)
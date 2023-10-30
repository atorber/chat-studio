import { post, get } from '@/utils/request'
import { ServeGetContactsVika, ServeSearchUserVika } from './contact-service'

// 解除好友关系服务接口
export const ServeDeleteContact = data => post('/api/v1/contact/delete', data)

// 修改好友备注服务接口
export const ServeEditContactRemark = data => post('/api/v1/contact/edit-remark', data)

// 搜索联系人
export const ServeSearchContact = data => get('/api/v1/contact/search', data)

// 好友申请服务接口
export const ServeCreateContact = data => post('/api/v1/contact/apply/create', data)

// 查询好友申请服务接口
export const ServeGetContactApplyRecords = data => get('/api/v1/contact/apply/records', data)

// 处理好友申请服务接口
export const ServeApplyAccept = data => post('/api/v1/contact/apply/accept', data)

export const ServeApplyDecline = data => post('/api/v1/contact/apply/decline', data)

// 查询好友申请未读数量服务接口
export const ServeFindFriendApplyNum = () => get('/api/v1/contact/apply/unread-num')

// 搜索用户信息服务接口
export const ServeContactGroupList = data => get('/api/v1/contact/group/list', data)

export const ServeContactMoveGroup = data => post('/api/v1/contact/move-group', data)

export const ServeContactGroupSave = data => post('/api/v1/contact/group/save', data)

// 获取好友列表服务接口
export const ServeGetContacts1 = data => get('/api/v1/contact/list', data)

// 获取好友列表服务接口
export const ServeGetContacts = data => ServeGetContactsVika(data)

// 搜索用户信息服务接口
export const ServeSearchUser = data => get('/api/v1/contact/detail', data)

// 搜索用户信息服务接口
export const ServeSearchUser2 = data => ServeSearchUserVika(data)
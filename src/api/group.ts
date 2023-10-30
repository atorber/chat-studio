import { post, get } from '@/utils/request'
import { ServeGetGroupsVika, ServeGroupDetailVika } from './group-service'

export const ServeGroupOvertList = data => get('/api/v1/group/overt/list', data)

// 创建群聊服务接口
export const ServeCreateGroup = data => post('/api/v1/group/create', data)

//  修改群信息
export const ServeEditGroup = data => post('/api/v1/group/setting', data)

// 邀请好友加入群聊服务接口
export const ServeInviteGroup = data => post('/api/v1/group/invite', data)

// 移除群聊成员服务接口
export const ServeRemoveMembersGroup = data => post('/api/v1/group/member/remove', data)

// 管理员解散群聊服务接口
export const ServeDismissGroup = data => post('/api/v1/group/dismiss', data)

export const ServeMuteGroup = data => post('/api/v1/group/mute', data)

export const ServeOvertGroup = data => post('/api/v1/group/overt', data)

// 用户退出群聊服务接口
export const ServeSecedeGroup = data => post('/api/v1/group/secede', data)

// 修改群聊名片服务接口
export const ServeUpdateGroupCard = data => post('/api/v1/group/member/remark', data)

// 获取用户可邀请加入群聊的好友列表
export const ServeGetInviteFriends = data => get('/api/v1/group/member/invites', data)

//  获取群聊成员列表
export const ServeGetGroupMembers = data => get('/api/v1/group/member/list', data)

//  获取群聊公告列表
export const ServeGetGroupNotices = data => get('/api/v1/group/notice/list', data)

//  编辑群公告
export const ServeEditGroupNotice = data => post('/api/v1/group/notice/edit', data)

export const ServeGetGroupApplyList = data => get('/api/v1/group/apply/list', data)

export const ServeGetGroupApplyAll = data => get('/api/v1/group/apply/all', data)

export const ServeDeleteGroupApply = data => post('/api/v1/group/apply/decline', data)

export const ServeAgreeGroupApply = data => post('/api/v1/group/apply/agree', data)

export const ServeCreateGroupApply = data => post('/api/v1/group/apply/create', data)

export const ServeGroupApplyUnread = data => get('/api/v1/group/apply/unread', data)

// 转让群主
export const ServeGroupHandover = data => post('/api/v1/group/handover', data)

// 分配管理员
export const ServeGroupAssignAdmin = data => post('/api/v1/group/assign-admin', data)

export const ServeGroupNoSpeak = data => post('/api/v1/group/no-speak', data)

// 查询用户群聊服务接口
// export const ServeGetGroups = () => get('/api/v1/group/list')

// 查询用户群聊服务接口
export const ServeGetGroups = () => ServeGetGroupsVika()

// 获取群信息服务接口
export const ServeGroupDetail1 = data => get('/api/v1/group/detail', data)

// 获取群信息服务接口
export const ServeGroupDetail = data => ServeGroupDetailVika(data)
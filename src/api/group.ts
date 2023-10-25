import { post, get } from '@/utils/request'
import { BaseEntity, VikaOptions, MappingOptions } from '@/utils/vika-orm' // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

// 查询用户群聊服务接口
export const ServeGetGroups = () => get('/api/v1/group/list')

export const ServeGroupOvertList = data => get('/api/v1/group/overt/list', data)

// 获取群信息服务接口
export const ServeGroupDetail = data => get('/api/v1/group/detail', data)

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

// // 定义一个延时方法
// const wait = (ms: number) => new Promise(resolve => {
//   setTimeout(resolve, ms);
// });

const mappingOptions: MappingOptions = {  // 定义字段映射选项
  fieldMapping: {  // 字段映射
    id: '群ID|id',
    topic: '群名称|topic',
    ownerId: '群主ID|ownerId',
    updated: '更新时间|updated',
    avatar: '头像|avatar',
    file: '头像图片|file',

  },
  tableName: '群列表|Room',  // 表名
}

/**
 * 用户实体
 */
export class Group extends BaseEntity {  // 用户类继承 BaseEntity

  topic?: string  // 定义名字属性，可选

  id?: string

  alias?: string

  updated?: string

  avatar?: string

  file?: string

  // protected static override recordId: string = ''  // 定义记录ID，初始为空字符串

  protected static override mappingOptions: MappingOptions = mappingOptions  // 设置映射选项为上面定义的 mappingOptions

  protected static override getMappingOptions(): MappingOptions {  // 获取映射选项的方法
    return this.mappingOptions  // 返回当前类的映射选项
  }

  static override setMappingOptions(options: MappingOptions) {  // 设置映射选项的方法
    this.mappingOptions = options  // 更新当前类的映射选项
  }

}

const vikaOptions: VikaOptions = {  // 定义 Vika API 的选项
  apiKey: `${(import.meta as any).env.VITE_VIKA_TOKEN}`,  // 从环境变量获取 API 密钥
  baseId: 'dst8RVi2LR15PkCC0q',  // 设置 base ID
}

Group.setVikaOptions(vikaOptions)  // 设置 Vika API 选项

// 查询用户群聊服务接口
export const ServeGetGroupsVika = async () => {
  const res = await Group.findAll()
  console.debug(res)
  const groups: any = {
    "code": 200,
    "message": "success",
    "data": {
      "items": [
        {
          "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
          "creator_id": 2055,
          "group_name": "抖聊开发群",
          "id": 1026,
          "is_disturb": 0,
          "leader": 2,
          "profile": ""
        },
      ]
    }
  }

  const items = res.map((value) => {
    if (value.fields.topic) {
      return {
        "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
        "creator_id": value.fields.ownerId,
        "group_name": value.fields.topic,
        "id": value.fields.id,
        "is_disturb": 0,
        "leader": 2,
        "profile": "",
        "recordId": value.recordId
      }
    }
    return false
  }).filter(item => item !== false);

  groups.data.items = items
  return groups
}

// 获取群信息服务接口
export const ServeGroupDetailVika = async (id) => {
  console.debug('id', id)
  let group = {
    "code": 200,
    "message": "success",
    "data": {  
        "avatar": "",
        "created_at": "2023-10-20 11:09:48",
        "group_id": 1012,
        "group_name": "测试一下",
        "is_disturb": 0,
        "is_manager": true,
        "is_mute": 0,
        "is_overt": 0,
        "profile": "",
        "visit_card": ""
    }
}
  const res = await Group.findByField('id', id)
  let item = {}
  if(res.length > 0){
    item = {
      "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
      "creator_id": res[0].fields.ownerId,
      "group_name": res[0].fields.topic,
      "id": res[0].fields.id,
      "is_disturb": 0,
      "leader": 2,
      "profile": "",
      "recordId": res[0].recordId,
    }
    group.data = item
  }else{
    group = {
      "code": 305,
      "message": `strconv.ParseInt: parsing "${id}": value out of range`
  }
  }


  console.debug(group)
  return group
}

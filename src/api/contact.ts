import { post, get } from '@/utils/request'
import { BaseEntity, VikaOptions, MappingOptions } from '@/utils/vika-orm' // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类

// 获取好友列表服务接口
export const ServeGetContacts = data => get('/api/v1/contact/list', data)

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
export const ServeSearchUser = data => get('/api/v1/contact/detail', data)

// 搜索用户信息服务接口
export const ServeContactGroupList = data => get('/api/v1/contact/group/list', data)

export const ServeContactMoveGroup = data => post('/api/v1/contact/move-group', data)

export const ServeContactGroupSave = data => post('/api/v1/contact/group/save', data)

// // 定义一个延时方法
// const wait = (ms: number) => new Promise(resolve => {
//   setTimeout(resolve, ms);
// });

const mappingOptions: MappingOptions = {  // 定义字段映射选项
  fieldMapping: {  // 字段映射
    alias: '备注名称|alias',
    id: '好友ID|id',
    name: '好友昵称|name',
    gender: '性别|gender',
    updated: '更新时间|updated',
    friend: '是否好友|friend',
    type: '类型|type',
    avatar: '头像|avatar',
    phone: '手机号|phone',
    file: '头像图片|file',

  },
  tableName: '好友列表|Contact',  // 表名
}

/**
 * 用户实体
 */
export class Contact extends BaseEntity {  // 用户类继承 BaseEntity

  name?: string  // 定义名字属性，可选

  id?: string

  alias?: string

  gender?: string

  updated?: string

  friend?: string

  type?: string

  avatar?: string

  phone?: string

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
  baseId: 'dstGgf1wRo1qVrWCQR',  // 设置 base ID
}

Contact.setVikaOptions(vikaOptions)  // 设置 Vika API 选项

// 获取好友列表服务接口
export const ServeGetContactsVika = async () => {
  const res = await Contact.findAll()
  // console.debug(res)
  const contacts: any = {
    "code": 200,
    "message": "success",
    "data": {
      "items": [
        {
          "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
          "gender": 0,
          "group_id": 0,
          "id": 7,
          "is_online": 0,
          "motto": "",
          "nickname": "test5",
          "remark": "test5"
        },
      ]
    }
  }

  const items = res.map((value) => {
    if (value.fields.name) {
      return {
        "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
        "gender": value.fields.gender,
        "group_id": 0,
        "id": value.fields.id,
        "is_online": 0,
        "motto": "",
        "nickname": value.fields.name,
        "remark": value.fields.alias,
        "recordId": value.recordId
      }
    }
    return false
  }).filter(item => item !== false);

  contacts.data.items = items
  return contacts
}

// 搜索用户信息服务接口
export const ServeSearchUserVika = async (id) => {
  console.debug('id', id)
  let contact = {
    "code": 200,
    "message": "success",
    "data": {  
      "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
      "gender": 0,
      "group_id": 0,
      "id": 7,
      "is_online": 0,
      "motto": "",
      "nickname": "test5",
      "remark": "test5"
    }
}
const res = await Contact.findByField('id', id)
  let item = {}
  if(res.length > 0){
    const value = res[0]
    item = {
      "avatar": "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
      "gender": value.fields.gender,
      "group_id": 0,
      "id": value.fields.id,
      "is_online": 0,
      "motto": "",
      "nickname": value.fields.name,
      "remark": value.fields.alias,
      "recordId": value.recordId,
      "email": 0,
      "friend_apply": 0,
      "friend_status": 2,
      "mobile": "--",
    }
    contact.data = item
  }else{
    contact = {
      "code": 305,
      "message": `strconv.ParseInt: parsing "${id}": invalid syntax`
  }
  }


  console.debug('contact', contact)
  return contact
}

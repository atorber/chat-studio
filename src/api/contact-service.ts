import { BaseEntity, MappingOptions } from '@/utils/vika-orm' // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类
import {initService} from './mod'

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

// 获取好友列表服务接口
export const ServeGetContactsVika = async (data) => {
  initService()
  console.debug('ServeGetContactsVika', data)
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
        "avatar": value.fields.avatar || "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
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
export const ServeSearchUserVika = async (parse) => {
  initService()
  const id = parse.user_id
  console.debug('id', id)
  let contact:any = {
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
  if (res.length > 0) {
    const value:any = res[0]
    item = {
      "avatar": value.fields.avatar || "http://localhost:5173/files/public/media/image/avatar/20231022/4f67de6461b9e930be9ac97b3a6cee4c_200x200.png",
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
  } else {
    contact = {
      "code": 305,
      "message": `strconv.ParseInt: parsing "${id}": invalid syntax`
    }
  }


  console.debug('contact', contact)
  return contact
}

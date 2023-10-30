import { BaseEntity, MappingOptions } from '@/utils/vika-orm' // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类
// import { storage } from '@/utils/storage'
import {initService} from './mod'

// // 定义一个延时方法
// const wait = (ms: number) => new Promise(resolve => {
//   setTimeout(resolve, ms);
// });

const mappingOptions: MappingOptions = {  // 定义字段映射选项
  fieldMapping: {  // 字段映射
    name: '配置项|name',
    key: '标识|key',
    value: '值|value',
    desc: '说明|desc',
    syncStatus: '同步状态|syncStatus',
    lastOperationTime: '最后操作时间|lastOperationTime',
    action: '操作|action',
  },
  tableName: '环境变量|Env',  // 表名
}

/**
 * 用户实体
 */
export class User extends BaseEntity {  // 用户类继承 BaseEntity

  name?: string

  key?: string

  value?: string

  desc?: string

  syncStatus?: string

  lastOperationTime?: string

  action?: string

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
export const ServeGetUserSettingVika = async () => {
  initService()

  const res = await User.findByField('key','BASE_BOT_ID')
  
  console.debug('ServeLoginVika:', res)

  const userInfo: any = {
    "code": 200,
    "message": "success",
    "data": {
        "setting": {
            "keyboard_event_notify": "",
            "notify_cue_tone": "",
            "theme_bag_img": "",
            "theme_color": "",
            "theme_mode": ""
        },
        "user_info": {
            "avatar": "",
            "email": "",
            "gender": 0,
            "is_qiye": false,
            "mobile": "15901228151",
            "motto": "",
            "nickname": "超哥",
            "uid": res[0]?.fields.value || '',
        }
    }
}

  console.debug('userInfo:', userInfo)
  return userInfo
}

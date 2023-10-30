import { BaseEntity, MappingOptions } from '@/utils/vika-orm' // 导入 BaseEntity, VikaOptions, 和 MappingOptions 类型/类
// import { storage } from '@/utils/storage'
import CryptoJS from 'crypto-js';
import { setVikaToken } from '../utils/auth'
import { Vika } from '@vikadata/vika'
import { post } from '@/utils/request'
import { initService } from './mod'

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
export class Env extends BaseEntity {  // 用户类继承 BaseEntity

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
export const ServeLoginVika = async (data) => {
  // {"mobile":"15901228151","password":"010213","platform":"web"}
  console.debug('ServeLoginVika data:', data)

  if(data.token){
    const vika = new Vika({ token: data.token })
    // 获取当前用户的空间站列表
    const spaceListResp = await vika.spaces.list()
    if (spaceListResp.success) {
      console.log('空间列表：',spaceListResp.data.spaces);
      const { spaces } = spaceListResp.data
      for (const space of spaces) {
        console.log(space)
        if (space.name === data.spacename) {
          data.spaceId = space.id
          break
        }
      }
      if (data.spaceId) {
        const nodeListResp = await vika.nodes.list({ spaceId: data.spaceId })
        if (nodeListResp.success) {
          console.log('数据表列表', nodeListResp.data.nodes);
          const client = data.token + data.spacename
          const hash = CryptoJS.SHA256(client).toString();
          console.debug('data.token+data.spacename hash:',client, hash)
          setVikaToken({ token: data.token, spacename: data.spacename, hash })
          initService()
        } else {
          console.error('维格表鉴权失败：', nodeListResp);
        }
      } else {
        console.error('空间不存在：', data.spacename);
      }
    } else {
      console.error('获取维格表空间失败：', spaceListResp);
    }
  
    const res = await Env.findAll()
    console.debug('ServeLoginVika res:', res)
  }

  const loginInfo = await post('/api/v1/auth/login', data)

  console.debug('loginInfo:', loginInfo)
  return loginInfo
}

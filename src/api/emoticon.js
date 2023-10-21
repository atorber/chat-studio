import { post, get, upload } from '@/utils/request'

// 查询用户表情包服务接口
export const ServeFindUserEmoticon = () => get('/api/v1/emoticon/list')

// 查询系统表情包服务接口
export const ServeFindSysEmoticon = () => get('/api/v1/emoticon/system/list')

// 设置用户表情包服务接口
export const ServeSetUserEmoticon = data => post('/api/v1/emoticon/system/install', data)

// 移除收藏表情包服务接口
export const ServeDelCollectEmoticon = data => post('/api/v1/emoticon/del-collect-emoticon', data)

// 上传表情包服务接口
export const ServeUploadEmoticon = data => upload('/api/v1/emoticon/customize/create', data)

export const ServeDeleteEmoticon = data => upload('/api/v1/emoticon/customize/delete', data)

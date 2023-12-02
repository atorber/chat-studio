import { h } from 'vue'
import { NAvatar } from 'naive-ui'
import { useTalkStore, useUserStore, useDialogueStore } from '@/store'
import { notifyIcon } from '@/constant/default'

import { isLoggedIn } from './utils/auth'

import EventTalk from './event/socket/talk'
import EventKeyboard from './event/socket/keyboard'
import EventLogin from './event/socket/login'
import EventRevoke from './event/socket/revoke'

import { Client } from 'paho-mqtt' // 从'mqtt-paho'库导入Client
import { v4 } from 'uuid'
import { storage } from '@/utils/storage'

/**
 * 延时函数
 * @param {*} ms 毫秒
 */
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 格式化消息数据
function formatMsg(data) {
  return JSON.stringify({
    reqId: v4(),
    method: 'thing.event.post',
    version: '1.0',
    timestamp: new Date().getTime(),
    events: data
  })
}

function formatMsgToWechaty(data) {
  // {"type":"text","content":"ok","quote_id":"","mention":{"all":0,"uids":[]},"receiver":{"receiver_id":"wxid_pnza7m7kf9tq12","talk_type":1}}
  // {"type":"image","width":1024,"height":1024,"url":"https://im.gzydong.com/public/media/image/common/20231030/2143db60700049fd68ab44263cd8b2cc_1024x1024.png","size":10000,"receiver":{"receiver_id":"20889085065@chatroom","talk_type":2}}
  const msg_type = data.type
  let messageType: any = 'Text'
  let messagePayload = ''

  switch (msg_type) {
    case 'text':
      messageType = 'Text'
      messagePayload = data.content
      break
    case 'image':
      messagePayload = data.url
      messageType = 'Image'
      break
    case 'Emoticon':
      messageType = 'Text'
      break
    case 'ChatHistory':
      messageType = 'Text'
      break
    case 'Audio':
      messageType = 4
      break
    case 'Attachment':
      messageType = 6
      break
    case 'Video':
      messageType = 5
      break
    case 'MiniProgram':
      messageType = 1
      break
    case 'Url':
      messageType = 1
      break
    case 'Recalled':
      messageType = 1
      break
    case 'RedEnvelope':
      messageType = 1
      break
    case 'Contact':
      messageType = 1
      break
    case 'Location':
      messageType = 1
      break
    default:
      messageType = 'Text'
      break
  }
  const msg = {
    reqId: v4(),
    method: 'thing.command.invoke',
    version: '1.0',
    timestamp: new Date().getTime(),
    name: 'send',
    params: {
      toContacts: [
        data.receiver.receiver_id
        // "5550027590@chatroom",
      ],
      messageType: messageType,
      messagePayload: messagePayload
    }
  }
  return JSON.stringify(msg)
}

/**
 * MQTT 连接实例
 *
 * 注释: 所有 mqtt 消息接收处理在此实例中处理
 */
class Socket {
  /**
   * mqtt 实例
   */
  client

  endpoint

  port

  clientID

  options

  apis

  botid

  /**
   * Socket 初始化实例
   */
  constructor() {
    console.debug('Socket init...')
    const VITE_SOCKET_API = import.meta.env.VITE_SOCKET_API
    // 分割字符串VITE_SOCKET_API为host和端口
    const hostAndPort = VITE_SOCKET_API.split('://')[1]
    this.endpoint = hostAndPort.split(':')[0]
    this.port = hostAndPort.split(':')[1]
    console.debug('mqtt endpoint:', this.endpoint)
    this.clientID = v4()
    console.log('client id：', this.clientID)
    this.client = new Client(this.endpoint, Number(this.port), this.clientID) // 创建新的mqtt-paho客户端实例

    this.options = {
      useSSL: true, // 使用 SSL/TLS 进行安全连接
      timeout: 40,
      userName: '',
      password: '',
      cleanSession: true,
      onSuccess: async () => {
        console.debug('MQTT连接成功~')
        this.subscribeToTopics()
        // 更新 MQTT 连接状态
        useUserStore().updateSocketStatus(true)
        // 载入聊天列表
        useTalkStore().loadTalkList()
      },
      onFailure: (evt) => {
        console.debug('MQTT连接失败~', evt)
      }
    }

    this.client.onConnectionLost = (responseObject) => {
      console.debug('MQTT连接丢失~', responseObject)
      // 更新 MQTT 连接状态
      useUserStore().updateSocketStatus(false)

      // 连接丢失时的回调函数
      if (responseObject.errorCode !== 0 && this.client.isConnected()) {
        console.log('MQTT 连接丢失:', responseObject.errorMessage)
        this.connect('断线重连...') // 连接到mqtt服务器
      }
    }

    this.client.onMessageArrived = (message) => {
      // 收到消息时的回调函数
      // console.log('接收到消息:', JSON.stringify(message));
      this.onMessage(message.destinationName, message.payloadString)
    }
    // console.debug("MQTT开始连接~");
    // this.connect();
  }

  subscribeToTopics() {
    console.debug('订阅消息主题:', JSON.stringify(this.apis))
    this.client.subscribe(this.apis.eventApi)
    this.client.subscribe(this.apis.commandApi)
  }

  // 新增方法处理读取消息事件
  handleMessageRead(data) {
    console.debug('客户端：', this.clientID)
    const dialogueStore = useDialogueStore()
    if (dialogueStore.index_name === `1_${data.sender_id}`) {
      for (const msgid of data.ids) {
        dialogueStore.updateDialogueRecord({ id: msgid, is_read: 1 })
      }
    }
  }

  // 连接 mqtt 服务
  connect(from) {
    console.debug('connect()请求来自：', from)
    delay(3000)

    const user = storage.get('user_info')
    console.debug('从缓存中获取用户信息：', user)

    const { hash } = user.user_info
    this.botid = hash
    console.debug('从用户信息中获取hash', hash)

    this.apis = {
      eventApi: `thing/chatbot/${this.botid}/event/post`,
      commandApi: `thing/chatbot/${this.botid}/command/invoke`
    }

    console.debug('MQTT连接状态：', this.client.isConnected())

    if (!this.client.isConnected() && isLoggedIn()) {
      try {
        console.debug('MQTT建立连接...')
        this.client.connect(this.options)
        console.debug('MQTT建立连接成功~')
      } catch (e) {
        console.error('MQTT建立连接失败：', e)
      }
    } else {
      console.debug('MQTT连接存在，不需要连接...')
    }
    console.debug('connect() success')
  }

  // 连接 mqtt 服务
  disconnect() {
    console.debug('disconnect()...')
    this.client.disconnect()
  }

  isConnect() {
    console.debug('isConnect()..., MQTT连接状态：', this.client.isConnected())
    if (!this.client.isConnected()) {
      return false
    }
    return true
  }

  /**
   * 注册回调消息处理事件
   */
  onMessage(topic, message) {
    console.debug('topic:', topic)
    console.debug('payload:', message)
    const messageObj = JSON.parse(message)

    if (topic === this.apis.eventApi) {
      if (messageObj.events['onMessage']) {
        const rawMsg = messageObj.events.onMessage
        // if(rawMsg.room) {
        //   rawMsg.room.id = 1029;
        // }
        // rawMsg.talker.id = 2055;
        const talk_type = rawMsg.room ? 2 : 1
        const user_id = rawMsg.talker.id
        const receiver_id = rawMsg.room ? rawMsg.room.id : rawMsg.listener.id
        const messageType = rawMsg.type
        let msg_type = 1
        const text = rawMsg.text ? JSON.parse(rawMsg.text) : {}
        console.debug('text', text)
        let extra = {}
        switch (messageType) {
          case 'Text':
            msg_type = 1
            break
          case 'Image': {
            msg_type = 3
            if (text.url) {
              extra = {
                width: 54,
                height: 54,
                url: text.url,
                size: text.size
              }
            }
            break
          }
          case 'Emoticon':
            msg_type = 1
            break
          case 'ChatHistory':
            msg_type = 9
            break
          case 'Audio':
            msg_type = 4
            if (text.url) {
              const filename = text.name
              const suffix = filename.split('.').pop()
              extra = {
                "suffix": suffix,
                "name": text.name,
                "path": text.url,
                "size": 0,
                "drive": 1
              }
            }
            break
          case 'Attachment': {
            msg_type = 6
            if (text.url) {
              const filename = text.name
              const suffix = filename.split('.').pop()
              extra = {
                "suffix": suffix,
                "name": text.name,
                "path": text.url,
                "size": 0,
                "drive": 1
              }
            }
            break
          }
          case 'Video': {
            msg_type = 5
            if (text.url) {
              const filename = text.name
              const suffix = filename.split('.').pop()
              extra = {
                "suffix": suffix,
                "name": text.name,
                "path": text.url,
                "size": 0,
                "drive": 1
              }
            }
            break
          }
          case 'MiniProgram':
            msg_type = 1
            break
          case 'Url':
            msg_type = 1
            break
          case 'Recalled':
            msg_type = 1
            break
          case 'RedEnvelope':
            msg_type = 1
            break
          case 'Contact':
            msg_type = 1
            break
          case 'Location':
            msg_type = 1
            break
          case 'GroupNote':
            msg_type = 1
            break
          case 'Transfer':
            msg_type = 1
            break
          case 'Post':
            msg_type = 1
            break
          case 'qrcode':
            msg_type = 3
            break
          case 'Unknown':
            msg_type = 1
            break
          default:
            break
        }
        const newMsg = {
          receiver_id, // 接收者ID
          sender_id: user_id, // 发送者ID
          talk_type, // 对话类型
          data: {
            id: rawMsg.data.payload.timestamp || rawMsg.data.id, // 消息ID
            sequence: rawMsg.data.payload.timestamp, // 消息序列号
            msg_id: rawMsg.data.id, // 消息ID
            talk_type, // 对话类型
            msg_type, // 消息类型
            user_id, // 发送者ID
            receiver_id, // 接收者ID
            nickname: rawMsg.talker.payload.name, // 发送者昵称
            avatar:
              rawMsg.talker.payload.avatar ||
              'https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png', // 发送者头像
            is_revoke: 0, // 是否撤回
            is_mark: 0, // 是否标记
            is_read: 0, // 是否已读
            content: rawMsg.data.payload.text || '', // 消息内容
            created_at: rawMsg.time, // 创建时间
            extra,
          }
        }
        this.emit('im.message', newMsg)
        // this.client.publish(this.apis.eventApi, formatMsg({ 'im.message': newMsg }))
      }

      if (messageObj.events['ping']) {
        this.emit('pong', '')
      }

      if (messageObj.events['pong']) {
        console.debug('pong')
      }

      // 对话消息事件
      if (messageObj.events['im.message']) {
        const data = messageObj.events['im.message']
        new EventTalk(data)
      }

      if (messageObj.events['im.message.read']) {
        const data = messageObj.events['im.message.read']
        console.debug('im.message.read', data)

        const dialogueStore = useDialogueStore()

        if (dialogueStore.index_name == `1_${data.sender_id}`) {
          for (const msgid of data.ids) {
            dialogueStore.updateDialogueRecord({ id: msgid, is_read: 1 })
          }
        }
      }

      // 好友在线状态事件
      if (messageObj.events['im.contact.status']) {
        const data = messageObj.events['im.contact.status']
        new EventLogin(data)
      }

      // 好友键盘输入事件
      if (messageObj.events['im.message.keyboard']) {
        const data = messageObj.events['im.message.keyboard']
        new EventKeyboard(data)
      }

      // 消息撤回事件
      if (messageObj.events['im.message.revoke']) {
        const data = messageObj.events['im.message.revoke']
        new EventRevoke(data)
      }

      // 好友申请事件
      if (messageObj.events['im.contact.apply']) {
        const data = messageObj.events['im.contact.apply']
        window['$notification'].create({
          title: '好友申请通知',
          content: data.remark,
          description: `申请人: ${data.friend.nickname}`,
          meta: data.friend.created_at,
          avatar: () =>
            h(NAvatar, {
              size: 'small',
              round: true,
              src: notifyIcon,
              style: 'background-color:#fff;'
            }),
          duration: 3000
        })
        useUserStore().isContactApply = true
      }

      // 群组申请事件
      if (messageObj.events['im.group.apply']) {
        const data = messageObj.events['im.group.apply']
        console.debug('im.group.apply', data)
        window['$notification'].create({
          title: '入群申请通知',
          content: '有新的入群申请，请注意查收',
          avatar: () =>
            h(NAvatar, {
              size: 'small',
              round: true,
              src: notifyIcon,
              style: 'background-color:#fff;'
            }),
          duration: 30000
        })

        useUserStore().isGroupApply = true
      }

      // 报错事件
      if (messageObj.events.event_error) {
        const data = messageObj.events['event_error']
        window['$message'].error(JSON.stringify(data))
      }
    }
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} mesage
   */
  send(message) {
    if (this.isConnect()) {
      // this.client.publish(this.apis.eventApi, formatMsg({ 'im.message': message }))
      this.client.publish(this.apis.commandApi, formatMsgToWechaty(message))
    } else {
      this.client.end()
    }
  }

  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  emit(event, data) {
    console.debug('emit() event:', event)
    console.debug('emit() data:', data)
    const rawMsg = {}
    rawMsg[event] = data
    const payload = formatMsg(rawMsg)
    this.client.publish(this.apis.eventApi, payload)
  }
}

export default new Socket()

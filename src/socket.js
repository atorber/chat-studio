import { h } from "vue";
import { useTalkStore } from "@/store/talk";
import { useUserStore } from "@/store/user";
import { useDialogueStore } from "@/store/dialogue";
import { getAccessToken, isLoggedIn } from "./utils/auth";
import WsSocket from "./plugins/ws-socket";
import { Client } from "paho-mqtt"; // 从'mqtt-paho'库导入Client

import EventTalk from "./event/socket/talk";
import EventKeyboard from "./event/socket/keyboard";
import EventLogin from "./event/socket/login";
import EventRevoke from "./event/socket/revoke";
import { NAvatar } from "naive-ui";
import { notifyIcon } from "@/constant/default";
import { v4 } from 'uuid'

// 格式化消息数据
export function formatMsg(data) {
  return {
    reqId: v4(),
    method: 'thing.event.post',
    version: '1.0',
    timestamp: new Date().getTime(),
    events: data,
  }
}

export function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
}

const urlCallback = () => {
  if (!isLoggedIn()) {
    window.location.reload();
  }

  const url = `${import.meta.env.VITE_SOCKET_API}/wss/default.io`;

  return `${url}?token=${getAccessToken()}`;
};

/**
 * Socket 连接实例
 *
 * 注释: 所有 WebSocket 和 MQTT 消息接收处理在此实例中处理
 */
class Socket {
  /**
   * WsSocket 实例
   */
  socket;

  client;

  clientID;

  apis;

  /**
   * Socket 初始化实例
   */
  constructor() {
    this.socket = new WsSocket(urlCallback, {
      onError: (evt) => {
        console.error("Websocket 连接失败回调方法", evt);
      },
      onOpen: (_evt) => {
        // 更新 WebSocket 连接状态
        useUserStore().updateSocketStatus(true);
        useTalkStore().loadTalkList();
      },
      onClose: (_evt) => {
        // 更新 WebSocket 连接状态
        useUserStore().updateSocketStatus(false);
      },
    });

    const endpoint = `${import.meta.env.VITE_MQTT_API}/mqtt`;
    console.debug('mqtt endpoint:', endpoint);

    this.clientID = generateRandomString(10); // 生成一个长度为10的随机字符串
    console.log("客户端：", this.clientID);
    this.apis = {
      ping: `${this.clientID}/lumenim/ping`,
      pong: `${this.clientID}/lumenim/pong`,
      message: `${this.clientID}/im/message`,
      messageRead: `${this.clientID}/im/message/read`,
      contactStatus: `${this.clientID}/im/contact/status`,
      messageKeyboard: `${this.clientID}/im/message/keyboard`,
      messageRevoke: `${this.clientID}/im/message/revoke`,
      contactApply: `${this.clientID}/im/contact/apply`,
      groupApply: `${this.clientID}/im/group/apply`,
      eventError: `${this.clientID}/event/error`,
      eventApi : `thing/chatbot/${this.clientID}/event/post`,
      commandApi : `thing/chatbot/${this.clientID}/command/invoke`
    };
    this.client = new Client(endpoint, this.clientID); // 创建新的mqtt-paho客户端实例

    this.options = {
      timeout: 40,
      userName: "",
      password: "",
      cleanSession: true,
      onSuccess: async () => {
        console.debug("MQTT连接成功~");
        this.subscribeToTopics();
      },
    };
    this.client.connect(this.options); // 连接到mqtt服务器
    this.client.onConnectionLost = (responseObject) => {
      // 连接丢失时的回调函数
      if (responseObject.errorCode !== 0) {
        console.log("MQTT 连接丢失:", responseObject.errorMessage);
        // useUserStore().updateSocketStatus(false);
      }
    };

    this.client.onMessageArrived = (message) => {
      // 收到消息时的回调函数
      // console.log('接收到消息:', JSON.stringify(message));
      this.onMessage(message.destinationName, message.payloadString);
    };

    this.register();
  }

  subscribeToTopics() {
    console.debug("订阅消息主题:", JSON.stringify(this.apis));
    this.client.subscribe(this.apis.ping);
    this.client.subscribe(this.apis.pong);
    this.client.subscribe(this.apis.message);
    this.client.subscribe(this.apis.messageRead);
    this.client.subscribe(this.apis.contactStatus);
    this.client.subscribe(this.apis.messageKeyboard);
    this.client.subscribe(this.apis.messageRevoke);
    this.client.subscribe(this.apis.contactApply);
    this.client.subscribe(this.apis.groupApply);
    this.client.subscribe(this.apis.eventError);
    this.client.subscribe(this.apis.eventApi);
    this.client.subscribe(this.apis.commandApi);
  }

  // 新增方法处理读取消息事件
  handleMessageRead(data) {
    console.debug('客户端：', this.clientID);
    const dialogueStore = useDialogueStore();
    if (dialogueStore.index_name === `1_${data.sender_id}`) {
      for (const msgid of data.ids) {
        dialogueStore.updateDialogueRecord({ id: msgid, is_read: 1 });
      }
    }
  }

  onMessage(topic, message) {
    console.debug("topic:", topic);
    console.debug("payload:", message);
    const data = JSON.parse(message);
    switch (topic) {
      case this.apis.ping:
        this.client.publish(this.apis.pong, JSON.stringify(""));
        this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({'pong':null})));
        this.emit("pong", "");
        break;
      case this.apis.message:
        console.debug("MQTT订阅到对话消息：", JSON.stringify(data));
        new EventTalk(data);
        break;
      case this.apis.messageRead:
        this.handleMessageRead(data);
        break;
      case this.apis.contactStatus:
        new EventLogin(data);
        break;
      case this.apis.messageKeyboard:
        new EventKeyboard(data);
        break;
      case this.apis.messageRevoke:
        new EventRevoke(data);
        break;
      case this.apis.contactApply:
        this.handleContactApply(data);
        break;
      case this.apis.eventError:
        window.$message.error(JSON.stringify(data));
        break;
      default:
        break;
    }
  }

  // 新增方法处理好友申请事件
  static handleContactApply(data) {
    window.$notification.create({
      title: "好友申请通知",
      content: data.remark,
      description: `申请人: ${data.friend.nickname}`,
      meta: data.friend.created_at,
      avatar: () =>
        h(NAvatar, {
          size: "small",
          round: true,
          src: notifyIcon,
          style: "background-color:#fff;",
        }),
      duration: 3000,
    });
    useUserStore().isContactApply = true;
  }

  // 连接 WebSocket 和 MQTT 服务
  connect() {
    this.socket.connection();
    console.debug("MQTT连接状态：", this.client.isConnected());

    if (!this.client.isConnected()) {
      // 在尝试连接前检查客户端是否已连接
      try {
        console.debug("MQTT建立连接...");
        this.client.connect(this.options);
        console.debug("MQTT建立连接成功~");
      } catch (e) {
        console.error("MQTT建立连接失败：", e);
      }
    } else {
      console.debug("MQTT连接存在，不需要连接...");
    }
  }

  // 断开 WebSocket 和 MQTT 服务连接
  disconnect() {
    this.socket.close();
    this.client.disconnect(); // 断开mqtt连接
  }

  isConnect() {
    if (!this.socket.connect) {
      return false;
    }

    return this.socket.connect.readyState === 1; // 检查WebSocket和mqtt连接状态
  }

  /**
   * 注册回调消息处理事件
   */
  register() {
    this.socket.on("ping", (data) => {
      console.debug(getCurrentTime(), "ws ping:", data);
      this.client.publish(this.apis.ping, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"ping":data||null})))
      // this.emit('pong', '')
    });

    this.socket.on("pong", (data) => {
      console.debug(getCurrentTime(), "ws pong:", data);
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"pong":data||null})))
    });

    // 对话消息事件
    this.socket.on("im.message", (data) => {
      console.debug("ws对话消息：", JSON.stringify(data));
      this.client.publish(this.apis.message, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.message":data})))
      // new EventTalk(data)
    });

    this.socket.on("im.message.read", (data) => {
      this.client.publish(this.apis.messageRead, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.message.read":data})))

      // const dialogueStore = useDialogueStore()
      // if (dialogueStore.index_name === `1_${data.sender_id}`) {
      //   for (const msgid of data.ids) {
      //     dialogueStore.updateDialogueRecord({ id: msgid, is_read: 1 })
      //   }
      // }
    });

    // 好友在线状态事件
    this.socket.on("im.contact.status", (data) => {
      this.client.publish(this.apis.contactStatus, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.contact.status":data})))

      // new EventLogin(data)
    });

    // 好友键盘输入事件
    this.socket.on("im.message.keyboard", (data) => {
      this.client.publish(this.apis.messageKeyboard, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.message.keyboard":data})))

      // new EventKeyboard(data)
    });

    // 消息撤回事件
    this.socket.on("im.message.revoke", (data) => {
      this.client.publish(this.apis.messageRevoke, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.message.revoke":data})))

      // new EventRevoke(data)
    });

    // 好友申请事件
    this.socket.on("im.contact.apply", (data) => {
      this.client.publish(this.apis.contactApply, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"im.contact.apply":data})))

      // window.$notification.create({
      //   title: '好友申请通知',
      //   content: data.remark,
      //   description: `申请人: ${data.friend.nickname}`,
      //   meta: data.friend.created_at,
      //   avatar: () =>
      //     h(NAvatar, {
      //       size: 'small',
      //       round: true,
      //       src: notifyIcon,
      //       style: 'background-color:#fff;',
      //     }),
      //   duration: 3000,
      // })
      // useUserStore().isContactApply = true
    });

    this.socket.on("event_error", (data) => {
      this.client.publish(this.apis.eventError, JSON.stringify(data));
      this.client.publish(this.apis.eventApi, JSON.stringify(formatMsg({"event_error":data})))

      // window['$message'].error(JSON.stringify(data))
    });
  }

  /**
   * 聊天发送数据
   *
   * @param {Object} message
   */
  send(message) {
    console.debug("ws发送消息：", JSON.stringify(message));
    if (this.isConnect()) {
      this.socket.send(message);
    } else {
      this.socket.close();
    }

    if (this.isConnect()) {
      this.client.publish(this.apis.message, JSON.stringify(message));
      this.client.publish(this.apis.commandApi, JSON.stringify({"name":"send","params":message}))
    } else {
      this.client.end();
    }
  }

  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  /**
   * 推送消息
   *
   * @param {String} event 事件名
   * @param {Object} data 数据
   */
  emit(event, data) {
    console.debug('ws event emit:', event);
    console.debug('ws data:', JSON.stringify(data));
    this.socket.emit(event, data);
    this.client.publish(event.replace(/[_.]/g, "/"), JSON.stringify(data));
  }
}

export default new Socket();

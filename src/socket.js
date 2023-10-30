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
import { v4 } from "uuid";
import { storage } from "@/utils/storage";
import { getVikaToken } from "@/utils/auth";

import { formatMsgToWechaty } from "./utils/wechaty";

// 格式化消息数据
export function formatMsg(data) {
  return JSON.stringify({
    reqId: v4(),
    method: "thing.event.post",
    version: "1.0",
    timestamp: new Date().getTime(),
    events: data,
  });
}

export function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

export function generateRandomString(length) {
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

  endpoint;

  botid;

  /**
   * Socket 初始化实例
   */
  constructor() {
    this.socket = new WsSocket(urlCallback, {
      onError: (evt) => {
        console.error("Websocket 连接失败回调方法", JSON.stringify(evt));
      },
      onOpen: (evt) => {
        // 更新 WebSocket 连接状态
        console.debug("this.userStore.uid", useUserStore().uid);
        useUserStore().updateSocketStatus(true);
        useTalkStore().loadTalkList();
        console.debug("Websocket 连接成功回调方法", JSON.stringify(evt));
      },
      onClose: (_evt) => {
        // 更新 WebSocket 连接状态
        useUserStore().updateSocketStatus(false);
      },
    });

    this.endpoint = `${import.meta.env.VITE_MQTT_API}/mqtt`;
    console.debug("mqtt endpoint:", this.endpoint);
    this.clientID = generateRandomString(32);
    console.log("client id：", this.clientID);
    this.client = new Client(this.endpoint, this.clientID); // 创建新的mqtt-paho客户端实例

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
    // this.client.connect(this.options); // 连接到mqtt服务器

    this.client.onConnectionLost = (responseObject) => {
      this.mqttIsConnect = false;
      // 连接丢失时的回调函数
      if (responseObject.errorCode !== 0) {
        console.log("MQTT 连接丢失:", responseObject.errorMessage);
        this.client.connect(this.options); // 连接到mqtt服务器
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
    this.client.subscribe(this.apis.eventApi);
    this.client.subscribe(this.apis.commandApi);
  }

  // 新增方法处理读取消息事件
  handleMessageRead(data) {
    console.debug("客户端：", this.clientID);
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

    if (topic === this.apis.eventApi) {
      if (data.events.onMessage) {
        const rawMsg = data.events.onMessage;
        // if(rawMsg.room) {
        //   rawMsg.room.id = 1029;
        // }
        // rawMsg.talker.id = 2055;

        const talk_type = rawMsg.room ? 2 : 1;
        const user_id = rawMsg.talker.id;
        const receiver_id = rawMsg.room ? rawMsg.room.id : rawMsg.listener.id;
        const messageType = rawMsg.data.payload.type;
        let msg_type = 1;
        switch (messageType) {
          case "Text":
            msg_type = 1;
            break;
          case "Image":
            msg_type = 3;
            break;
          case "Emoticon":
            msg_type = 1;
            break;
          case "ChatHistory":
            msg_type = 9;
            break;
          case "Audio":
            msg_type = 4;
            break;
          case "Attachment":
            msg_type = 6;
            break;
          case "Video":
            msg_type = 5;
            break;
          case "MiniProgram":
            msg_type = 1;
            break;
          case "Url":
            msg_type = 1;
            break;
          case "Recalled":
            msg_type = 1;
            break;
          case "RedEnvelope":
            msg_type = 1;
            break;
          case "Contact":
            msg_type = 1;
            break;
          case "Location":
            msg_type = 1;
            break;
          case "GroupNote":
            msg_type = 1;
            break;
          case "Transfer":
            msg_type = 1;
            break;
          case "Post":
            msg_type = 1;
            break;
          case "qrcode":
            msg_type = 3;
            break;
          case "Unknown":
            msg_type = 1;
            break;
          default:
            break;
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
              "https://im.gzydong.com/public/media/image/avatar/20230530/f76a14ce98ca684752df742974f5473a_200x200.png", // 发送者头像
            is_revoke: 0, // 是否撤回
            is_mark: 0, // 是否标记
            is_read: 0, // 是否已读
            content: rawMsg.data.payload.text, // 消息内容
            created_at: rawMsg.time, // 创建时间
            extra: {
              // 扩展字段
            },
          },
        };
        this.emit("im.message", newMsg);
        this.client.publish(
          this.apis.eventApi,
          formatMsg({ "im.message": newMsg })
        );
      }
      if (data.events.ping) {
        this.emit("pong", "");
      }
      if (data.events["im.message"]) {
        new EventTalk(data.events["im.message"]);
      }
      if (data.events["im.message.read"]) {
        this.handleMessageRead(data.events["im.message.read"]);
      }
      if (data.events["im.contact.status"]) {
        new EventLogin(data.events["im.contact.status"]);
      }
      if (data.events["im.message.keyboard"]) {
        new EventKeyboard(data.events["im.message.keyboard"]);
      }
      if (data.events["im.message.revoke"]) {
        new EventRevoke(data.events["im.message.revoke"]);
      }
      if (data.events["im.contact.apply"]) {
        this.handleContactApply(data.events["im.contact.apply"]);
      }
      if (data.events.event_error) {
        window.$message.error(JSON.stringify(data.events.event_error));
      }
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
    console.debug("connect()...");

    this.socket.connection();

    const { hash } = getVikaToken();
    this.botid = hash;
    console.debug("从缓存中获取hash", hash);

    this.apis = {
      eventApi: `thing/chatbot/${this.botid}/event/post`,
      commandApi: `thing/chatbot/${this.botid}/command/invoke`,
    };

    console.debug("MQTT连接状态：", this.client.isConnected());
    if (!this.client.isConnected()) {
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
    console.debug("connect() success");
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
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ ping: data || null })
      );
      // this.emit('pong', '')
    });

    this.socket.on("pong", (data) => {
      console.debug(getCurrentTime(), "ws pong:", data);
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ pong: data || null })
      );
    });

    // 对话消息事件
    this.socket.on("im.message", (data) => {
      // console.debug("ws对话消息：", JSON.stringify(data));
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.message": data })
      );
      if (data.sender_id === storage.get("user_info").user_info.uid) {
        this.client.publish(this.apis.commandApi, formatMsgToWechaty(data));
      }
      // new EventTalk(data)
    });

    this.socket.on("im.message.read", (data) => {
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.message.read": data })
      );

      // const dialogueStore = useDialogueStore()
      // if (dialogueStore.index_name === `1_${data.sender_id}`) {
      //   for (const msgid of data.ids) {
      //     dialogueStore.updateDialogueRecord({ id: msgid, is_read: 1 })
      //   }
      // }
    });

    // 好友在线状态事件
    this.socket.on("im.contact.status", (data) => {
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.contact.status": data })
      );

      // new EventLogin(data)
    });

    // 好友键盘输入事件
    this.socket.on("im.message.keyboard", (data) => {
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.message.keyboard": data })
      );

      // new EventKeyboard(data)
    });

    // 消息撤回事件
    this.socket.on("im.message.revoke", (data) => {
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.message.revoke": data })
      );

      // new EventRevoke(data)
    });

    // 好友申请事件
    this.socket.on("im.contact.apply", (data) => {
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.contact.apply": data })
      );

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
      this.client.publish(this.apis.eventApi, formatMsg({ event_error: data }));

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
      this.client.publish(
        this.apis.eventApi,
        formatMsg({ "im.message": message })
      );
      this.client.publish(this.apis.commandApi, formatMsgToWechaty(message));
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
  emit(event, data) {
    console.debug("ws event emit:", event);
    console.debug("ws data:", JSON.stringify(data));
    this.socket.emit(event, data);
    // this.client.publish(this.apis.commandApi, formatMsgToWechaty(data))

    // const msg2 = {}
    // msg2[event] = data
    // console.debug(msg2)
    // this.client.publish(this.apis.eventApi,formatMsg(msg2));
  }
}

export default new Socket();

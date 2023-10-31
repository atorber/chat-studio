import { Env } from "./auth-service";
import { Group } from "./group-service";
import { Contact } from "./contact-service";
import { Chat } from "./chat-service";
import { User } from './user-service'
import { getVikaToken } from '../utils/auth'

export const initService = () => {
    const {token, nodes} = getVikaToken()
    Env.setVikaOptions({
      apiKey: token,
      baseId: nodes['环境变量|Env'], // 设置 base ID
    });
  
    Chat.setVikaOptions({
      apiKey: token,
      baseId: nodes['消息记录|Message'], // 设置 base ID
    });
  
    Group.setVikaOptions({
      apiKey: token,
      baseId: nodes["群列表|Room"], // 设置 base ID
    });
  
    User.setVikaOptions({
      apiKey: token,
      baseId: nodes["环境变量|Env"], // 设置 base ID
    });
  
    Contact.setVikaOptions({
      apiKey: token,
      baseId: nodes["好友列表|Contact"], // 设置 base ID
    });
  }

export {
    Env,
    Group,
    Contact,
    Chat,
    User
}
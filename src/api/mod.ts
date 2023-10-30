import { Env } from "./auth-service";
import { Group } from "./group-service";
import { Contact } from "./contact-service";
import { Chat } from "./chat-service";
import { User } from './user-service'
import { getVikaToken } from '../utils/auth'

export const initService = () => {
    const {token} = getVikaToken()
    Env.setVikaOptions({
      apiKey: token,
      baseId: "dstnCCAzr4MjvSyrwU", // 设置 base ID
    });
  
    Chat.setVikaOptions({
      apiKey: token,
      baseId: "dstnQ4fEhpKp4VQptm", // 设置 base ID
    });
  
    Group.setVikaOptions({
      apiKey: token,
      baseId: "dst8RVi2LR15PkCC0q", // 设置 base ID
    });
  
    User.setVikaOptions({
      apiKey: token,
      baseId: "dstnCCAzr4MjvSyrwU", // 设置 base ID
    });
  
    Contact.setVikaOptions({
      apiKey: token,
      baseId: "dstGgf1wRo1qVrWCQR", // 设置 base ID
    });
  }

export {
    Env,
    Group,
    Contact,
    Chat,
    User
}
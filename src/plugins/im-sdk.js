class ImSDK {
  /**
   * 发送文本消息
   *
   * @param {*} data
   */
  static sendText(_data = {}) {}

  /**
   * 发送图片消息
   *
   * @param {*} data
   */
  static sendImage(_data = {}) {}

  /**
   * 发送图片消息
   *
   * @param {*} data
   */
  static sendFile(_data = {}) {}

  /**
   * 发送代码消息
   *
   * @param {*} data
   */
  static sendCode(_data = {}) {}

  /**
   * 发送投票消息
   *
   * @param {*} data
   */
  static sendVote(_data = {}) {}

  /**
   * 发送位置消息
   *
   * @param {*} data
   */
  static sendLocation(_data = {}) {}

  /**
   * 发送表情包
   *
   * @param {*} data
   */
  static sendEmoticon(_data = {}) {}

  /**
   * 发送键盘消息
   */
  static sendKeyboardMsg() {}
}

export default new ImSDK();

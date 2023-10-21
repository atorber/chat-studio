/**
 * 去除字符串控制
 *
 * @param {String} str
 */
export function trim(str, type = null) {
  if (type) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  } if (type === 'l') {
    return str.replace(/(^\s*)/g, '')
  } 
    return str.replace(/(\s*$)/g, '')
  
}

/**
 * 隐藏用户手机号中间四位
 *
 * @param {String} phone  手机号
 */
export function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * Url 替换超链接
 *
 * @param {String} text 文本
 * @param {String} color 超链接颜色
 */
export function textReplaceLink(text, color = '#409eff') {
  const exp =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi
  return text.replace(
    exp,
    `<a href='$1' alt='link' style="color:${color};text-decoration: revert;">$1</a >`
  )
}

/**
 * 文本 替换@信息
 *
 * @param {String} text 文本
 * @param {String} color 超链接颜色
 */
export function textReplaceMention(text, color = '#2196F3') {
  return text.replace(/@\S+/g, ($0, _$1) => `<span style="color:${color};">${$0}</span>`)
}

/**
 * 格式化文件大小
 *
 * @param {string|number} value 文件大小(字节)
 */
export function fileFormatSize(value) {
  if (value === null || value === '') {
    return '0'
  }

  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(value)
  index = Math.floor(Math.log(srcsize) / Math.log(1000))

  let size = srcsize / 1000**index
  size = size.toFixed(2) //保留的小数位数
  return size + unitArr[index]
}

/**
 * 获取文件后缀名
 *
 * @param {String} fileName
 */
export function fileSuffix(fileName) {
  const ext = fileName.split('.')

  return ext[ext.length - 1]
}

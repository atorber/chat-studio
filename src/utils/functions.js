import { getAccessToken } from '@/utils/auth'

/**
 * 通过图片url获取图片大小
 *
 * @param {String} imgsrc 例如图片名： D8x5f13a53dbc4b9_350x345.png
 */
export function getImageInfo(imgsrc='null') {
  console.log('imgsrc', imgsrc)
  const data = {
    width: 0,
    height: 0,
  }

  const arr = imgsrc.split('_')
  if (arr.length === 1) return data

  let info = arr[arr.length - 1].match(/\d+x\d+/g)
  if (info === null) return data

  info = info[0].split('x')

  return {
    width: parseInt(info[0], 10),
    height: parseInt(info[1], 10),
  }
}

/**
 * 文件下载方法
 *
 * @param {Number} cr_id
 */
export function download(cr_id) {
  const token = getAccessToken()
  try {
    const link = document.createElement('a')
    // link.target = '_blank'
    link.href = `${
      import.meta.env.VITE_BASE_API
    }/api/v1/talk/records/file/download?cr_id=${cr_id}&token=${token}`
    link.click()
  } catch (e) {}
}

export function insertText(obj, str) {
  if (document.selection) {
    const sel = document.selection.createRange()
    sel.text = str
  } else if (
    typeof obj.selectionStart === 'number' &&
    typeof obj.selectionEnd === 'number'
  ) {
    const startPos = obj.selectionStart;
      const endPos = obj.selectionEnd;
      let cursorPos = startPos;
      const tmpStr = obj.value
    obj.value =
      tmpStr.substring(0, startPos) +
      str +
      tmpStr.substring(endPos, tmpStr.length)
    cursorPos += str.length
    obj.selectionEnd = cursorPos
    obj.selectionStart = obj.selectionEnd

    obj.focus()
  } else {
    obj.value += str
  }
}

export function countDownTime(second = 0) {
  // 小于10 加0 处理
  function formate0to9(arg) {
    return arg < 10 ? `0${arg}` : arg
  }

  const hours = parseInt((second / 60 / 60) % 24, 10) //剩余的小时
  const minutes = parseInt((second / 60) % 60, 10) //剩余的分钟
  const seconds = parseInt(second % 60, 10) //剩余的秒数

  return `${formate0to9(hours)}:${formate0to9(minutes)}:${formate0to9(seconds)}`
}

export function removeTags(str) {
  return str.replace(/<\/?[^>]+>/gi, '')
}

export function downloadImage(src, name) {
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function () {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = name || 'image.png'
    a.href = url
    a.dispatchEvent(event)
  }
  image.src = src
}
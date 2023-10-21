const WebNotification =
  window.Notification || window.mozNotification || window.webkitNotification

// 申请获取浏览器权限
export function applyNotificationAuth(fn) {
  const notification = WebNotification

  if (notification) {
    notification.requestPermission(result => 
       fn(result === 'granted') // granted（允许） || denied（拒绝）
    )
  } else {
    console.warn('浏览器不支持通知!')
    return fn(false)
  }
  return null
}

// 显示浏览器通知
export function WebNotify(title = '', options = {}) {
  const notification = new WebNotification(title, options)

  notification.onclick = function (_event) {
    notification.close()
  }
}

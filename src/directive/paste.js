export default {
  created(el, binding, _vnode) {
    el.addEventListener('paste', (event) => {
      //这里直接监听元素的粘贴事件
      binding.value(event)
    })
  },
}

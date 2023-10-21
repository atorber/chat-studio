import { reactive, ref, h } from 'vue'

export function useContextMenu() {
  const isShow = ref(false)
  const menus = reactive([])
  console.debug(menus)
  const showContextMenu = () => {
    isShow.value = true
  }

  const closeContextMenu = () => {}

  const renderContextMenu = () => h(
      'div', // type
      { id: 'foo', class: 'bar' }, // props
      [
        /* children */
      ]
    )

  return {
    showContextMenu,
    closeContextMenu,
    renderContextMenu,
  }
}

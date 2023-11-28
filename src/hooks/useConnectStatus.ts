import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/store'
import { isLoggedIn } from '@/utils/auth'
import socket from '@/socket'
import { useUserStore } from '@/store'

export const useConnectStatus = () => {
  const settingsStore = useSettingsStore()
  const router = useRouter()
  const userStore = useUserStore()
  watchEffect(() => {
    if (settingsStore.isLeaveWeb) {
      return
    }

    const pathname = router.currentRoute.value.path

    const paths = ['/auth/login', '/auth/register', '/auth/forget']

    if (!paths.includes(pathname) && isLoggedIn()) {
      userStore.loadSetting()
      !socket.isConnect() && socket.connect('useConnectStatus...')
    }
  })

  return {}
}

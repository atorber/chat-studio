import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/store'
import { isLoggedIn } from '@/utils/auth'
import ws from '@/connect'
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
      !ws.isConnect() && ws.connect('useConnectStatus...')
    }
  })

  return {}
}

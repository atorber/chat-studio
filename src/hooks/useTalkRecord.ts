import { reactive, computed, nextTick } from 'vue'
import { ServeTalkRecords } from '@/api/chat'
import { useDialogueStore } from '@/store'
import { IMessageRecord } from '@/types/chat'
import { formatTalkRecord } from '@/utils/talk'
import { addClass, removeClass } from '@/utils/dom'

interface Params {
  receiver_id: number
  talk_type: number
  limit: number
}

export const useTalkRecord = (uid: number) => {
  const dialogueStore = useDialogueStore()

  const records = computed((): IMessageRecord[] => dialogueStore.records)

  const location = reactive({
    msgid: '',
    num: 0
  })

  const loadConfig = reactive({
    receiver_id: 0,
    talk_type: 0,
    status: 0,
    minRecord: 0
  })

  const onJumpMessage = (msgid: string) => {
    const element = document.getElementById(msgid)
    if (!element) {
      if (location.msgid == '') {
        location.msgid = msgid
        location.num = 3
      } else {
        location.num--

        if (location.num === 0) {
          location.msgid = ''
          location.num = 0
          window['$message'].info('仅支持查看最近300条的记录')
          return
        }
      }

      const el = document.getElementById('imChatPanel')

      el?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }

    location.msgid = ''
    location.num = 0

    element?.scrollIntoView({
      behavior: 'smooth'
    })

    addClass(element, 'border')

    setTimeout(() => {
      element && removeClass(element, 'border')
    }, 3000)
  }

  // 加载数据列表
  const load = async (params: Params) => {
    const request = {
      ...params,
      record_id: loadConfig.minRecord,
      limit: 30
    }

    loadConfig.status = 0

    let scrollHeight = 0
    const el = document.getElementById('imChatPanel')
    if (el) {
      scrollHeight = el.scrollHeight
    }

    const { data, code } = await ServeTalkRecords(request)
    if (code != 200) {
      return (loadConfig.status = 1)
    }

    // 防止对话切换过快，数据渲染错误
    if (
      request.talk_type != loadConfig.talk_type ||
      request.receiver_id != loadConfig.receiver_id
    ) {
      return (location.msgid = '')
    }

    const items = (data.items || []).map((item: IMessageRecord) => formatTalkRecord(uid, item))

    console.log('load...', items)
    if (request.record_id == 0) {
      // 判断是否是初次加载
      dialogueStore.clearDialogueRecord()
    }

    dialogueStore.unshiftDialogueRecord(items.reverse())

    loadConfig.status = items.length >= request.limit ? 1 : 2

    loadConfig.minRecord = data.record_id

    nextTick(() => {
      if (!el) return

      if (request.record_id == 0) {
        el.scrollTop = el.scrollHeight

      } else {
        el.scrollTop = el.scrollHeight - scrollHeight
      }

      if (location.msgid) {
        onJumpMessage(location.msgid)
      }
    })
  }

  const onRefreshLoad = () => {
    if (loadConfig.status == 1) {
      load({
        receiver_id: loadConfig.receiver_id,
        talk_type: loadConfig.talk_type,
        limit: 30
      })
    }
  }

  const onLoad = (params: Params) => {
    loadConfig.minRecord = 0
    loadConfig.receiver_id = params.receiver_id
    loadConfig.talk_type = params.talk_type

    load(params)
  }

  return { loadConfig, records, onLoad, onRefreshLoad, onJumpMessage }
}

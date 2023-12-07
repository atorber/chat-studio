import { defineStore } from 'pinia'
import {
  ServeGetArticleDetail,
  ServeGetArticleClass,
  ServeGetArticleTag,
  ServeGetArticleList,
  ServeEditArticleClass,
  ServeEditArticleTag,
  ServeDeleteArticleClass,
  ServeDeleteArticleTag
} from '@/api/article'

export const usePluginStore = defineStore('plugin', {
  state: () => {
    return {
      tags: [],
      class: [],

      notes: {
        loadStatus: 0,
        params: { page: 1, keyword: '', find_type: 1, cid: 0 },
        items: []
      },

      view: {
        editorMode: 'preview',
        loadId: 0,
        loadStatus: 0,
        detail: {
          id: 0,
          class_id: 0,
          title: '',
          is_asterisk: 0,
          status: 1,
          tags: [],
          files: [],
          content: '',
          md_content: '',
          created_at: '',
          class_name: ''
        }
      }
    }
  },

  actions: {
    close() {
      this.view.loadId = 0
    },

    addNewNote(class_id = 0) {
      this.view.detail = {
        class_id: class_id,
        content: '',
        created_at: '',
        files: [],
        id: 0,
        is_asterisk: 0,
        md_content: '',
        status: 1,
        tags: [],
        title: '请编辑标题！！！'
      }

      this.view.loadId = 1
      this.view.loadStatus = 1

      this.setEditorMode('edit')

      this.loadClass()
    },

    loadClass() {
      const res = {
        code: 200,
        message: 'success',
        data: {
          items: [
            {
              class_name: '测试文集',
              count: 2,
              id: 22,
              is_default: 0
            },
            {
              class_name: '我的笔记',
              count: 0,
              id: 66,
              is_default: 1
            },
            {
              class_name: '默认分类',
              count: 5,
              id: 0,
              is_default: 0
            }
          ],
          paginate: {
            page: 1,
            size: 100000,
            total: 3
          }
        }
      }
      const code = res.code
      const data = res.data
      if (code != 200) return false

      this.class = data.items
      console.debug('this.class', this.class)
      // ServeGetArticleClass().then(({ code, data }) => {
      //   if (code != 200) return false

      //   this.class = data.items
      // })
    },

    loadTags() {
      const res = {
        code: 200,
        message: 'success',
        data: {
          tags: [
            {
              count: 2,
              id: 83,
              tag_name: '5565'
            },
            {
              count: 0,
              id: 84,
              tag_name: '有意义'
            },
            {
              count: 0,
              id: 93,
              tag_name: 'very good'
            },
            {
              count: 0,
              id: 94,
              tag_name: '332'
            }
          ]
        }
      }
      const code = res.code
      const data = res.data
      if (code != 200) return false

      this.tags = data.tags
      console.debug('this.tags', this.tags)
      // ServeGetArticleTag().then(({ code, data }) => {
      //   if (code != 200) return false

      //   this.tags = data.tags
      // })
    },

    loadNoteList(params = {}, isReset = true) {
      if (isReset) {
        Object.assign(this.notes.params, { page: 1, keyword: '', find_type: 1, cid: 0 }, params)
      } else {
        Object.assign(this.notes.params, params)
      }

      this.notes.loadStatus = 0
      this.notes.items = []
      const res = {
        code: 200,
        message: 'success',
        data: {
          items: [
            {
              abstract: '77777',
              class_id: 0,
              class_name: '',
              created_at: '2023-10-23 10:14:31',
              id: 546,
              image: '',
              is_asterisk: 0,
              status: 1,
              tags_id: '',
              title: '77',
              updated_at: '2023-10-23 10:14:31'
            },
            {
              abstract: '滴滴 嗒嗒  滴滴滴 哒哒哒',
              class_id: 0,
              class_name: '',
              created_at: '2023-06-09 10:41:35',
              id: 502,
              image: '',
              is_asterisk: 0,
              status: 1,
              tags_id: '',
              title: '请编辑标题！！！',
              updated_at: '2023-10-21 14:52:24'
            },
            {
              abstract:
                'd佛挡杀佛递四方速递1  language\n  language\nTitle\nSub Title\n\nList\nitem1\nitem2\nitem3\n\n  引用\n1\npublic void main(String[] args){\n  System.out![log-e.png](http',
              class_id: 22,
              class_name: '测试文集',
              created_at: '2021-09-03 17:00:46',
              id: 325,
              image:
                'https://im.gzydong.com/public/media/image/note/20230723/5e8492c9839a1d64ddbef2a9eeeb20c9_434x108.png',
              is_asterisk: 1,
              status: 1,
              tags_id: '83',
              title: '东方闪电',
              updated_at: '2023-10-17 10:12:20'
            },
            {
              abstract: 'dsa大萨达吉林省',
              class_id: 0,
              class_name: '',
              created_at: '2023-08-04 14:27:47',
              id: 524,
              image: '',
              is_asterisk: 1,
              status: 1,
              tags_id: '',
              title: 'dsadhh',
              updated_at: '2023-10-17 10:11:58'
            },
            {
              abstract:
                '32323123123\n\n323123213\nfsdaf\nsadf\nsf\nsdf\nsf\nsda\nfsda\nfsd\nfsdafs',
              class_id: 22,
              class_name: '测试文集',
              created_at: '2023-03-14 22:27:24',
              id: 476,
              image: '',
              is_asterisk: 0,
              status: 1,
              tags_id: '83',
              title: '请编辑标题！！！',
              updated_at: '2023-07-31 15:53:53'
            },
            {
              abstract: 'yuo',
              class_id: 0,
              class_name: '',
              created_at: '2023-07-06 03:28:58',
              id: 515,
              image: '',
              is_asterisk: 0,
              status: 1,
              tags_id: '',
              title: 'uk',
              updated_at: '2023-07-19 10:32:19'
            },
            {
              abstract: 'test',
              class_id: 0,
              class_name: '',
              created_at: '2023-06-09 09:47:11',
              id: 501,
              image: '',
              is_asterisk: 1,
              status: 1,
              tags_id: '',
              title: '请编辑标题！！！',
              updated_at: '2023-06-27 17:50:23'
            }
          ],
          paginate: {
            page: 1,
            size: 1000,
            total: 7
          }
        }
      }
      this.notes.items = res.data.items
      console.debug('this.notes.items', this.notes.items)
      this.notes.loadStatus = 1
      console.debug('this.notes.loadStatus', this.notes.loadStatus)
      // ServeGetArticleList(this.notes.params).then((res) => {
      //   this.notes.items = res.data.items

      //   this.notes.loadStatus = 1
      // })
    },

    updateNoteItem(id, params = {}) {
      const item = this.notes.items.find((item) => item.id == id)

      item && Object.assign(item, params)
    },

    // 加载详情信息
    loadDetail(id) {
      this.view.loadId = id
      this.view.loadStatus = 0

      this.setEditorMode('preview')
      const res = {
        "code": 200,
        "message": "success",
        "data": {
            "class_id": 0,
            "content": "\u003cp data-v-md-line=\"1\"\u003e77777\u003c/p\u003e\n",
            "created_at": "2023-10-23 10:14:31",
            "files": [],
            "id": 546,
            "is_asterisk": 0,
            "md_content": "77777",
            "tags": [],
            "title": "77",
            "updated_at": "2023-10-23 10:14:31"
        }
    }
    const code = res.code
    const data = res.data
      if (code != 200 && data.id != this.view.loadId) {
        return
      }

      this.view.loadStatus = 1

      data.class_name = ''
      this.view.detail = data

      let node = this.class.find((item) => {
        return item.id == data.class_id
      })

      this.view.detail.class_name = node.class_name || ''

      // ServeGetArticleDetail({
      //   article_id: id
      // }).then(({ code, data }) => {
      //   if (code != 200 && data.id != this.view.loadId) {
      //     return
      //   }

      //   this.view.loadStatus = 1

      //   data.class_name = ''
      //   this.view.detail = data

      //   let node = this.class.find((item) => {
      //     return item.id == data.class_id
      //   })

      //   this.view.detail.class_name = node.class_name || ''
      // })
    },

    // 修改编辑模式
    setEditorMode(value) {
      this.view.editorMode = value
    },

    // 修改收藏状态
    setCollectionStatus(isTrue) {
      this.view.detail.is_asterisk = isTrue ? 1 : 0
    },

    // 编辑分类
    async editClass(class_id, class_name) {
      const res = await ServeEditArticleClass({ class_id, class_name })

      if (res && res.code === 200) {
        if (class_id === 0) {
          this.class.unshift({ class_name, count: 0, id: res.data.id })
        } else {
          const item = this.class.find((item) => item.id === class_id)
          item && Object.assign(item, { class_name })
        }
      }
    },

    async deleteClass(class_id) {
      const res = await ServeDeleteArticleClass({ class_id })

      if (res && res.code == 200) {
        const index = this.class.findIndex((item) => item.id === class_id)

        if (index >= 0) {
          this.class.splice(index, 1)
        }
      } else {
        window['$message'].info(res.message)
      }
    },

    // 编辑标签
    async editTag(tag_id, tag_name) {
      const res = await ServeEditArticleTag({ tag_id, tag_name })

      if (res && res.code === 200) {
        if (tag_id === 0) {
          this.tags.unshift({ tag_name, count: 0, id: res.data.id })
        } else {
          const item = this.tags.find((item) => item.id === tag_id)
          item && Object.assign(item, { tag_name })
        }
      }
    },

    async deleteTag(tag_id) {
      const res = await ServeDeleteArticleTag({ tag_id })

      if (res && res.code == 200) {
        const index = this.tags.findIndex((item) => item.id === tag_id)

        if (index >= 0) {
          this.tags.splice(index, 1)
        }
      } else {
        window['$message'].info(res.message)
      }
    }
  }
})

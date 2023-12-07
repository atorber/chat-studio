<template>
  <PageTitle title="插件市场" />
  <section class="el-container height100">
    <aside class="el-aside" style="width: 230px"><NoteMenu /></aside>
    <aside
      class="el-aside"
      style="width: 350px"
      v-dropsize="{ min: 200, max: 500, direction: 'right' }"
    >
      <NoteList />
    </aside>

    <main class="el-main">
      <component :is="loadId > 0 ? NoteView : NoteEmpty" />
    </main>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import NoteMenu from './inner/NoteMenu.vue'
import NoteList from './inner/NoteList.vue'
import NoteView from './inner/NoteView.vue'
import NoteEmpty from './inner/NoteEmpty.vue'
import { usePluginStore } from '@/store'
import PageTitle from '@/layout/PageTitle.vue'

const noteStore = usePluginStore()

const loadId = computed(() => noteStore.view.loadId)
</script>

<style lang="less" scoped>
.el-header {
  height: 60px;
  line-height: 60px;
  padding-left: 15px;
  font-size: 18px;
  -webkit-app-region: drag;
}
</style>

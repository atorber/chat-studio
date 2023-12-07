<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useDialogueStore } from '@/store'
import IndexContent from './inner/IndexContent.vue'
import IndexSider from './inner/IndexSider.vue'
import IndexAmicable from './inner/IndexAmicable.vue'

const dialogueStore = useDialogueStore()

onUnmounted(() => {
  dialogueStore.$reset()
})
</script>

<template>
  <section class="el-container">
    <aside
      v-show="dialogueStore.isShowSessionList"
      v-dropsize="{
        min: 200,
        max: 500,
        direction: 'right',
        key: 'session-list'
      }"
      class="el-aside bdr-r session-list"
    >
      <IndexSider />
    </aside>

    <main class="el-main">
      <component :is="dialogueStore.index_name ? IndexContent : IndexAmicable" />
    </main>

    <!-- <div style="min-width: 20%;border-color:blue;background-color:ghostwhite;text-align: center;">
      <br><br>对话拓展区域
    </div> -->
  </section>
</template>

<style lang="less">
.el-container {
  height: 100%;
}

.el-aside {
  width: 320px;
  position: relative;
  user-select: none;
}

.small-screen {
  .el-aside {
    width: 260px;
  }
}

.skip-bottom[data-v-3c44be38] {
    position: absolute;
    right: 58px;
    bottom: 0px;
    min-width: 100px;
    height: 28px;
    font-size: 12px;
    background-color: #1ebafc;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: bottom 1s ease-in-out;
    border-radius: 10px 10px 0 0;
}
</style>

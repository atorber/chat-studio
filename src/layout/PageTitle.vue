<script setup>
import { markRaw } from 'vue'

defineProps({
  title: {
    type: String,
    default: '未定义标题'
  },
})
</script>

<template>
<header class="el-header bdr-b">{{ title }}</header>
</template>

<style lang="less" scoped>
.section {
  height: 100%;

  .el-header {
    height: 60px;
    line-height: 60px;
    padding-left: 15px;
    font-size: 18px;
    -webkit-app-region: drag;
  }

  .el-aside {
    width: 180px;
    padding: 8px;
    padding-top: 3px;

    a {
      text-decoration: none;
      // color: rgba(0, 0, 0, 0.65);
      color: var(--im-text-color);
    }

    .menu {
      height: 35px;
      padding: 0 5px;
      font-size: 13px;
      border-radius: 5px;
      margin: 8px 2px;
      display: flex;
      align-items: center;
      color: var(--im-text-color);

      > div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon {
        width: 30px;
      }

      .name {
        flex: auto;
        justify-content: flex-start;
        padding-left: 5px;
      }

      .tips {
        width: 30px;

        .badge {
          background-color: #ff4d4f;
          color: white;
        }
      }

      &.selectd {
        background-color: var(--im-hover-bg-color);
        font-weight: 400;
        color: var(--im-primary-color);
      }
    }
  }
}
</style>

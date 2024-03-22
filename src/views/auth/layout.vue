<script setup>
import { isElectronMode } from '@/utils/common'
</script>

<template>
  <div id="logo-name" v-if="!isElectronMode()">ChatFlow</div>

  <section class="section">
    <router-view />
  </section>

  <div class="copyright">
    <span>©2022 - 2024 ChatFlow IM管控</span>
    <span><a href="http://beian.miit.gov.cn" target="_blank">粤ICP备16007353号</a></span>
    <span><a href="https://github.com/atorber/chatflow" target="_blank">GitHub源码</a></span>
  </div>

  <div class="fly-box">
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<style lang="less" scoped>
body {
  -webkit-app-region: drag;
}
@import '@/assets/css/login.less';

.section {
  height: 100vh;
  width: 100vw;
}
</style>

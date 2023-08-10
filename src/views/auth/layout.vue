<script setup>
import { isElectronMode } from '@/utils/common'
</script>

<template>
  <div id="logo-name" v-if="!isElectronMode()">Chat Studio</div>

  <section class="section">
    <router-view />
  </section>

  <div class="copyright">
    <span>©2022 - 2023 ChatStudio</span>
    <span
      ><a href="http://beian.miit.gov.cn" target="_blank"
        >粤ICP备16007353号</a
      ></span
    >
    <!-- <span>Github源码</span> -->
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
</style>

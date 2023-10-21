<script setup>
// Import Statements
import "@icon-park/vue-next/styles/index.css";
import {
  NNotificationProvider,
  NMessageProvider,
  NDialogProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
  darkTheme,
  NLayoutContent,
} from "naive-ui";

import hljs from "highlight.js/lib/core";
import { provide, ref, computed } from "vue";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/vue-next";
import { useUserStore, useNotifyStore, useTalkStore } from "@/store";
import socket from "@/socket";
import { publisher } from "@/utils/publisher.ts";
import { listener } from "@/listener";
import { overrides } from "@/constant/theme";
import { isLoggedIn } from "@/utils/auth";
import { NotificationApi, MessageApi, DialogApi } from "@/components/common";
import UserCardModal from "@/components/user/UserCardModal.vue";

// Icon Configuration
IconProvider({
  ...DEFAULT_ICON_CONFIGS,
  theme: "outline",
  size: 24,
  strokeWidth: 3,
  strokeLinejoin: "bevel",
});

// State and Computed Properties
const isShowUser = ref(false);
const showUserId = ref(0);
const userStore = useUserStore();
const notifyStore = useNotifyStore();
const talkStore = useTalkStore();
const getDarkTheme = computed(() => {
  const theme = notifyStore.darkTheme ? "dark" : "light";
  document.querySelector("html").dataset.theme = theme;
  document.querySelector("html").style = "";
  return notifyStore.darkTheme ? darkTheme : undefined;
});
const getThemeOverride = computed(() => {
  if (notifyStore.darkTheme) {
    overrides.common.bodyColor = "#202124";
    overrides.common.baseColor = "#ffffff";
  }
  return overrides;
});

// Functions
const onChangeRemark = (value) => {
  publisher.publish("contact:change-remark", value);
  talkStore.setRemark(value);
};

// Initial Setup
if (isLoggedIn()) {
  socket.connect();
  userStore.loadSetting();
}
listener();

// Provide Function
provide("$user", (uid) => {
  showUserId.value = uid;
  isShowUser.value = true;
});
</script>

<template>
  <audio id="audio" preload="preload" muted>
    <source src="@/assets/music.mp3" type="audio/mp3" />
  </audio>

  <n-config-provider
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverride"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <n-message-provider>
      <message-api />
    </n-message-provider>

    <n-notification-provider>
      <notification-api />
    </n-notification-provider>

    <n-dialog-provider>
      <dialog-api />
    </n-dialog-provider>

    <n-layout-content>
      <router-view />
      <UserCardModal
        v-model:show="isShowUser"
        v-model:uid="showUserId"
        @change-remark="onChangeRemark"
      />
    </n-layout-content>
  </n-config-provider>
</template>

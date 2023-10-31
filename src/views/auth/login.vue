<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  // NDivider,
  NForm,
  NFormItem,
} from "naive-ui";
import { ServeLogin } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { palyMusic } from "@/utils/talk";
import socket from "@/socket";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const formRef = ref();
const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "账号不能为空",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "密码不能为空",
  },
};

const model = reactive({
  username: "",
  password: "",
  loading: false,
});

const onLogin = () => {
  model.loading = true;

  model.username = "18798272054";
  model.password = "admin123";

  if (!model.spacename || !model.token) {
    window.$message.warning("请输入维格表空间名称及token");
    model.loading = false;

  } else {
    const response = ServeLogin({
      mobile: model.username,
      password: model.password,
      token: model.token,
      spacename: model.spacename,
      platform: "web",
    });

    console.debug("请求登录onLogin", response);

    response.then((res) => {
      console.debug("请求登录：", res);
      if (res.code === 200) {
        window.$message.success("登录成功");
        console.debug("设置access_token缓存...\n");
        setAccessToken(res.data.access_token, res.data.expires_in);
        console.debug("连接ws...\n");
        socket.connect();
        console.debug("载入用户设置...\n");
        userStore.loadSetting();
        console.debug("跳转到控制台...\n");
        console.debug("跳转到", route.query.redirect || "/");
        router.push(route.query.redirect || "/").catch((error) => {
          console.error(error);
        });
      } else {
        window.$message.warning(res.message);
      }
    });

    response.finally(() => {
      console.debug("登录请求结束");
      model.loading = false;
    });
  }
};

const onValidate = (e) => {
  e.preventDefault();

  // 谷歌浏览器提示音需要用户主动交互才能播放，登录入口主动交互一次，后面消息提示音就能正常播放了
  palyMusic(true);

  formRef.value.validate((errors) => {
    !errors && onLogin();
  });
};

// const onClickAccount = type => {
//   if (type === 1) {
//     model.username = '18798272054'
//     model.password = 'admin123'
//     model.spacename = '瓦力'
//     model.token = ''
//   } else {
//     model.username = '18798272055'
//     model.password = 'admin123'
//     model.spacename = '大师'
//     model.token = ''
//   }

//   // onLogin()
// }
</script>

<template>
  <section class="el-container is-vertical login-box login">
    <header class="el-header box-header">快捷登录</header>

    <main class="el-main" style="padding: 3px">
      <n-form ref="formRef" size="large" :model="model" :rules="rules">
        <!-- <n-form-item path="username" :show-label="false">
          <n-input
            placeholder="请输入手机号"
            v-model:value="model.username"
            :maxlength="11"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            placeholder="请输入密码"
            type="password"
            show-password-on="click"
            v-model:value="model.password"
            @keydown.enter="onValidate"
          />
        </n-form-item> -->

        <n-form-item path="spacename" :show-label="false">
          <n-input
            placeholder="请输入维格表spacename"
            show-password-on="click"
            v-model:value="model.spacename"
            @keydown.enter="onValidate"
          />
        </n-form-item>

        <n-form-item path="token" :show-label="false">
          <n-input
            placeholder="请输入维格表token"
            type="password"
            show-password-on="click"
            v-model:value="model.token"
            @keydown.enter="onValidate"
            autocomplete="current-password"
          />
        </n-form-item>

        <n-button
          type="primary"
          size="large"
          block
          class="mt-t20"
          @click="onValidate"
          :loading="model.loading"
        >
          立即登录
        </n-button>
      </n-form>

      <!-- <div class="helper">
        <n-button text color="#409eff" @click="router.push('/auth/forget')">
          找回密码
        </n-button>
        <n-button text color="#409eff" @click="router.push('/auth/register')">
          还没有账号？立即注册
        </n-button>
      </div> -->
    </main>

    <footer class="el-footer" style="height: 90px">
      <n-divider style="height: 30px; margin: 0">
        <span style="color: #ccc; font-weight: 300">
          操作说明:<br />1.在维格云获取token及空间名称<br />2.启动chatflow服务端</span
        >
      </n-divider>
      <!-- <div class="preview-account">
        <p @click="onClickAccount(1)">预览账号:18798272054 / 密码: admin123</p>
        <p @click="onClickAccount(2)">预览账号:18798272055 / 密码: admin123</p>
      </div> -->
    </footer>
  </section>
</template>

<style lang="less" scoped>
@import "@/assets/css/login.less";
</style>

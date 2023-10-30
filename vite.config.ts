import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compressPlugin from 'vite-plugin-compression'
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), 'VITE')

  return {
    base: env.VITE_BASE,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 路径别名
      },
      extensions: ['.js', '.json', 'jsx', '.vue', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    root: process.cwd(),
    assetsInclude: ['./src/assets'],
    plugins: [vue(), vueJsx({}), compressPlugin(), eslintPlugin(), ],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    // server: {
    //   proxy: {
    //     // 当你的本地开发服务器试图获取'/api'路径下的内容时，Vite将自动将请求代理到指定的远程服务器。
    //     '/space': {
    //       target: 'https://s1.vika.cn',  // 你的远程服务器地址
    //       changeOrigin: true,  // 此选项表示是否应更改原始主机头为目标URL
    //       // rewrite: (path) => path.replace(/^\/space/, '')  // 此选项可以将URL重写为远程服务器能理解的格式
    //     }
    //   }
    // }
  }
})

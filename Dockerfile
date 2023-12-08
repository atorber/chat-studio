# 第一阶段：构建应用
# 使用 Node.js 镜像作为基础进行构建
FROM node:16 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：设置 Nginx
# 使用 Nginx 镜像作为基础
FROM nginx:alpine

# 从构建阶段复制 dist 目录到 Nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口（Nginx 默认端口）
EXPOSE 80

# 使用默认的 Nginx 启动命令
CMD ["nginx", "-g", "daemon off;"]

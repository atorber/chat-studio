# 第一阶段：使用 Node.js 构建项目
FROM node:latest as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 第二阶段：设置 Nginx
FROM nginx:alpine

# 从 builder 阶段复制构建出的 dist 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 创建一个自定义的 Nginx 配置文件
RUN echo 'server {\
    listen       80;\
    server_name  localhost;\
\
    location / {\
        root   /usr/share/nginx/html;\
        index  index.html index.htm;\
        try_files $uri $uri/ /index.html;\
    }\
\
    location /api/v1 {\
        proxy_pass http://127.0.0.1:9503;\
    }\
}' > /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

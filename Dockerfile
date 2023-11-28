# 使用更小的基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 并执行 npm install
COPY package.json ./
RUN npm install

# 复制应用程序文件
COPY . .

# 设置启动命令
CMD [ "npm", "run", "dev:host"]
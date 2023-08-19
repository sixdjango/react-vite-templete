# 基于 node 镜像
FROM node:18.15.0-alpine as build

# 设置工作目录
WORKDIR /app
# 安装 pnpm
RUN npm i -g pnpm

# 将项目依赖复制到工作目录
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 拷贝所有文件到工作目录
COPY . .

# 构建静态资源
RUN pnpm build

# 开始使用 nginx
FROM nginx:1.25.0-alpine

# 清除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 拷贝 nginx 配置文件到容器
COPY nginx.conf /etc/nginx/

# 从第一阶段拷贝静态资源
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
# 部署指南

本文档详细介绍如何将 IconsHub 部署到各种平台。

## 📋 目录

- [GitHub Pages 部署](#github-pages-部署)
- [Vercel 部署](#vercel-部署)
- [Netlify 部署](#netlify-部署)
- [Docker 部署](#docker-部署)
- [自建服务器部署](#自建服务器部署)
- [CDN 加速](#cdn-加速)

---

## 🌐 GitHub Pages 部署

### 方式 1：自动部署（推荐）

#### 前置准备

1. Fork 本仓库到你的 GitHub 账号
2. 克隆到本地：
```bash
git clone https://github.com/your-username/IconsHub.git
cd IconsHub
```

#### 配置项目

1. 编辑 `config.yml`：
```yaml
deployment:
  branch: "gh-pages"  # 或其他分支名
  domain: "icons.yourdomain.com"  # 可选
```

2. 提交配置：
```bash
git add config.yml
git commit -m "配置部署设置"
git push origin main
```

#### 启用 GitHub Pages

1. 进入仓库设置：`Settings` > `Pages`
2. Source 选择：`gh-pages` 分支
3. 点击 `Save`

#### 触发部署

**自动触发**：
- 每次推送到 `main` 分支会自动部署

**手动触发**：
1. 进入 `Actions` 标签
2. 选择 `CI Deploy to GitHub Pages`
3. 点击 `Run workflow`
4. 选择参数并运行

#### 配置自定义域名

1. 在域名 DNS 设置中添加 CNAME 记录：
```
icons  →  your-username.github.io
```

2. 在 `config.yml` 中配置：
```yaml
deployment:
  domain: "icons.yourdomain.com"
```

3. 等待 DNS 传播（最多 24 小时）

4. 启用 HTTPS：
   - GitHub Pages 会自动配置 Let's Encrypt 证书
   - 等待几分钟即可生效

### 方式 2：手动部署

```bash
# 1. 构建项目
npm run build

# 2. 进入构建目录
cd dist

# 3. 初始化 Git
git init
git add -A
git commit -m 'deploy'

# 4. 推送到 gh-pages 分支
git push -f git@github.com:your-username/IconsHub.git main:gh-pages

# 5. 返回项目根目录
cd ..
```

---

## 🚀 Vercel 部署

### 方式 1：通过 Vercel 面板

#### 步骤 1：导入项目

1. 访问 [Vercel](https://vercel.com/)
2. 点击 `New Project`
3. 导入你的 GitHub 仓库

#### 步骤 2：配置构建

```
Framework Preset: Vue.js
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 步骤 3：环境变量（可选）

无需配置环境变量，除非你有特殊需求。

#### 步骤 4：部署

点击 `Deploy` 开始部署。

#### 步骤 5：配置自定义域名

1. 部署成功后，进入项目设置
2. 选择 `Domains`
3. 添加你的域名
4. 按照提示配置 DNS

### 方式 2：通过 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 生产部署
vercel --prod
```

### vercel.json 配置

创建 `vercel.json`（可选）：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*).png",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).webp",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=2592000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🎯 Netlify 部署

### 方式 1：通过 Netlify 面板

#### 步骤 1：导入项目

1. 访问 [Netlify](https://www.netlify.com/)
2. 点击 `New site from Git`
3. 选择 GitHub 并授权
4. 选择你的仓库

#### 步骤 2：配置构建

```
Build command: npm run build
Publish directory: dist
```

#### 步骤 3：部署

点击 `Deploy site` 开始部署。

#### 步骤 4：配置自定义域名

1. 进入 `Domain settings`
2. 点击 `Add custom domain`
3. 输入你的域名
4. 按照提示配置 DNS

### 方式 2：通过 Netlify CLI

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 初始化
netlify init

# 4. 部署
netlify deploy

# 5. 生产部署
netlify deploy --prod
```

### netlify.toml 配置

创建 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=2592000, immutable"

[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=2592000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=604800"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=604800"
```

---

## 🐳 Docker 部署

### 方式 1：使用 Nginx

#### 创建 Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage

# 复制构建文件
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf.example /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 构建镜像

```bash
docker build -t iconshub .
```

#### 运行容器

```bash
# 基本运行
docker run -d -p 80:80 iconshub

# 带卷映射（可更新图标）
docker run -d \
  -p 80:80 \
  -v $(pwd)/public/icon:/usr/share/nginx/html/icon \
  iconshub
```

### 方式 2：使用 Docker Compose

#### docker-compose.yml

```yaml
version: '3.8'

services:
  iconshub:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./public/icon:/usr/share/nginx/html/icon
    restart: unless-stopped
```

#### 启动服务

```bash
# 启动
docker-compose up -d

# 停止
docker-compose down

# 重启
docker-compose restart

# 查看日志
docker-compose logs -f
```

### Nginx 配置优化

编辑 `nginx.conf.example`：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/json image/svg+xml;

    # 图标缓存
    location ~* \.(png|jpg|jpeg|gif|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }

    # CSS 和 JS 缓存
    location ~* \.(css|js)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🖥️ 自建服务器部署

### 使用 Nginx

#### 步骤 1：构建项目

```bash
npm run build:optimized
```

#### 步骤 2：上传文件

```bash
# 使用 SCP
scp -r dist/* user@server:/var/www/iconshub/

# 或使用 RSYNC
rsync -avz dist/ user@server:/var/www/iconshub/
```

#### 步骤 3：配置 Nginx

```nginx
server {
    listen 80;
    server_name icons.yourdomain.com;
    root /var/www/iconshub;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/json image/svg+xml;

    # 图标缓存
    location ~* \.(png|jpg|jpeg|gif|svg|webp)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }

    # CSS 和 JS 缓存
    location ~* \.(css|js)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }

    # JSON 缓存
    location ~* \.json$ {
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 步骤 4：启用 HTTPS

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d icons.yourdomain.com

# 自动续期
sudo certbot renew --dry-run
```

### 使用 Apache

#### 配置 .htaccess

`.htaccess` 文件已包含在 `public` 目录中。

#### 虚拟主机配置

```apache
<VirtualHost *:80>
    ServerName icons.yourdomain.com
    DocumentRoot /var/www/iconshub

    <Directory /var/www/iconshub>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/iconshub-error.log
    CustomLog ${APACHE_LOG_DIR}/iconshub-access.log combined
</VirtualHost>
```

#### 启用必要的模块

```bash
sudo a2enmod rewrite
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod headers
sudo systemctl restart apache2
```

---

## 🌍 CDN 加速

### 使用 Cloudflare

#### 步骤 1：添加站点

1. 登录 Cloudflare
2. 添加你的域名
3. 更新 DNS 服务器

#### 步骤 2：配置缓存规则

在 Page Rules 中添加：

```
https://icons.yourdomain.com/*

缓存级别: 缓存所有内容
边缘缓存 TTL: 1 个月
浏览器缓存 TTL: 1 个月
```

#### 步骤 3：优化设置

- **Brotli 压缩**: 开启
- **Auto Minify**: 开启 JS、CSS、HTML
- **Rocket Loader**: 可选开启
- **Mirage**: 开启（图片优化）

### 使用 jsDelivr

如果你的项目部署在 GitHub：

```
https://cdn.jsdelivr.net/gh/username/IconsHub@branch/dist/icon/分类/图标.png
```

示例：
```
https://cdn.jsdelivr.net/gh/GWen124/IconsHub@Web/icon/AI/ChatGPT.png
```

### 使用阿里云 OSS

#### 步骤 1：创建 Bucket

1. 登录阿里云 OSS 控制台
2. 创建 Bucket（公共读权限）
3. 开启 CDN 加速

#### 步骤 2：上传文件

```bash
# 使用 ossutil
ossutil cp -r dist/icon/ oss://your-bucket/icon/
```

#### 步骤 3：配置 CDN

```
源站: your-bucket.oss-cn-hangzhou.aliyuncs.com
加速域名: icons.yourdomain.com
```

---

## 📊 部署平台对比

| 平台 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **GitHub Pages** | 免费、自动部署、CDN | 国内速度较慢 | 个人项目 |
| **Vercel** | 快速、自动部署、全球 CDN | 免费版有限制 | 小型项目 |
| **Netlify** | 免费、功能丰富、易用 | 带宽限制 | 中小型项目 |
| **Docker** | 完全控制、可移植 | 需要服务器 | 企业部署 |
| **自建服务器** | 完全控制、无限制 | 需要维护 | 大型项目 |

---

## 🔍 部署检查清单

### 构建前

- [ ] 运行 `npm run scan-icons`
- [ ] 检查 `config.yml` 配置
- [ ] 验证图标文件完整性
- [ ] 测试本地构建

### 部署后

- [ ] 访问网站检查页面
- [ ] 测试图标加载
- [ ] 检查搜索功能
- [ ] 测试图标复制
- [ ] 验证 HTTPS 证书
- [ ] 检查缓存策略
- [ ] 测试移动端响应

### 性能检查

- [ ] 使用 PageSpeed Insights 测试
- [ ] 检查 Service Worker 状态
- [ ] 验证 CDN 加速效果
- [ ] 测试首屏加载时间
- [ ] 检查图片加载策略

---

## 💡 部署最佳实践

1. **使用优化构建**: `npm run build:optimized`
2. **启用 HTTPS**: 所有平台都应使用 HTTPS
3. **配置缓存**: 合理设置缓存时间
4. **使用 CDN**: 加速全球访问
5. **监控性能**: 定期检查性能指标
6. **备份数据**: 定期备份图标文件
7. **自动部署**: 使用 CI/CD 自动化
8. **版本控制**: 使用 Git 管理代码

---

## 🐛 常见部署问题

### 问题 1：GitHub Pages 部署失败

**解决方法**：
1. 检查 Actions 日志
2. 确认分支设置正确
3. 验证 config.yml 语法

### 问题 2：自定义域名不生效

**解决方法**：
1. 检查 DNS 设置
2. 等待 DNS 传播
3. 清除浏览器缓存

### 问题 3：图标链接 404

**解决方法**：
1. 检查文件路径
2. 验证大小写
3. 确认文件已部署

### 问题 4：Service Worker 缓存过期

**解决方法**：
```javascript
// 在浏览器控制台执行
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

---

## 📞 获取帮助

如果遇到部署问题：
1. 查看 [常见问题](GUIDE.md#问题排查)
2. 提交 [Issue](https://github.com/GWen124/IconsHub/issues)
3. 参考 [讨论区](https://github.com/GWen124/IconsHub/discussions)

---

**祝部署顺利！** 🎉


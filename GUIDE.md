# IconsHub 详细使用指南

## 📑 目录

- [新手入门](#新手入门)
- [图标管理](#图标管理)
- [配置定制](#配置定制)
- [高级功能](#高级功能)
- [性能优化](#性能优化)
- [问题排查](#问题排查)

---

## 🎓 新手入门

### 第一次使用

#### 步骤 1：克隆项目

```bash
git clone https://github.com/GWen124/IconsHub.git
cd IconsHub
```

#### 步骤 2：安装依赖

```bash
npm install
```

等待安装完成（约 2-3 分钟）。

#### 步骤 3：启动项目

```bash
npm run dev
```

访问 `http://localhost:8080`，你会看到所有图标按分类显示。

#### 步骤 4：添加你的第一个图标

1. 准备一个 PNG 图片（建议 512x512 像素）
2. 重命名为有意义的名称，如 `MyApp.png`
3. 放入分类目录，如 `public/icon/App Hub/MyApp.png`
4. 运行扫描：`npm run scan-icons`
5. 刷新浏览器，你的图标就出现了！

---

## 📁 图标管理

### 图标文件要求

#### 支持的格式
- ✅ PNG（推荐）
- ✅ JPG / JPEG
- ✅ SVG
- ✅ WebP

#### 文件命名规范
- ✅ 使用英文字母、数字、下划线
- ✅ 可以使用空格
- ✅ 示例：`My App.png`, `App_Name.png`, `App-Name.png`
- ❌ 避免特殊字符：`@#$%^&*()`

#### 推荐尺寸
- **标准**：512x512 像素
- **最小**：256x256 像素
- **最大**：1024x1024 像素

### 分类管理

#### 查看现有分类

```bash
ls public/icon/
```

#### 创建新分类

```bash
# 1. 创建分类目录
mkdir "public/icon/新分类名称"

# 2. 添加图标文件
cp your-icon.png "public/icon/新分类名称/"

# 3. 配置分类标题
```

编辑 `category-titles.json`：

```json
{
  "新分类名称": "显示的中文名称"
}
```

#### 删除分类

```bash
# 删除分类目录
rm -rf "public/icon/要删除的分类"

# 重新扫描
npm run scan-icons
```

### 批量操作

#### 批量添加图标

```bash
# 方法 1：复制整个目录
cp -r /path/to/icons/* public/icon/App\ Hub/

# 方法 2：使用通配符
cp /path/to/icons/*.png public/icon/App\ Hub/

# 扫描
npm run scan-icons
```

#### 批量重命名

```bash
# 批量添加前缀
cd public/icon/App\ Hub/
for file in *.png; do
  mv "$file" "MyPrefix_$file"
done

# 扫描
cd ../../../
npm run scan-icons
```

#### 批量转换格式

```bash
# 使用 ImageMagick 批量转换
cd public/icon/App\ Hub/
for file in *.jpg; do
  convert "$file" "${file%.jpg}.png"
  rm "$file"
done
```

### 图标版本管理

#### 多个版本的同一图标

使用后缀区分不同版本：

```
public/icon/App Hub/
  ├── GitHub_A.png    # 版本 A
  ├── GitHub_B.png    # 版本 B
  ├── GitHub_C.png    # 版本 C
  └── GitHub_D.png    # 版本 D
```

显示效果：
- GitHub_A
- GitHub_B
- GitHub_C
- GitHub_D

---

## ⚙️ 配置定制

### 基础配置

#### 修改网站标题

编辑 `config.yml`：

```yaml
site:
  title: "我的图标库"  # 修改这里
  description: "自定义描述"
```

#### 修改部署域名

```yaml
deployment:
  domain: "icons.yourdomain.com"
```

#### 修改版权信息

```yaml
copyright:
  startDate: "2024-01-01"  # 开始年份
  autoRange: true          # 自动显示范围
```

显示效果：`Copyright © 2024-2025`

### 高级配置

#### 自定义分类顺序

编辑 `category-titles.json`，分类按文件中的顺序显示：

```json
{
  "AI": "AI 工具",
  "Docker": "Docker 容器",
  "Cloud Hub": "云服务",
  "App Hub": "应用中心"
}
```

#### 自定义 Footer 链接

编辑 `config.yml`：

```yaml
footer:
  websiteText: "我的网站"
  websiteUrl: "https://your-website.com"
```

> **注意**：Wen 链接固定在代码中，不可修改。

### 主题定制

#### 修改颜色

编辑 `src/views/index.vue`，找到颜色变量：

```scss
/* 颜色变量 */
$primary-color: #6366f1;      // 主色调（紫色）
$secondary-color: #4f46e5;    // 次色调（深紫）
$bg-color: #f8fafc;           // 背景色（浅灰）
$text-dark: #1e293b;          // 深色文字
$text-light: #64748b;         // 浅色文字
```

#### 常用配色方案

**蓝色主题**：
```scss
$primary-color: #3b82f6;
$secondary-color: #2563eb;
```

**绿色主题**：
```scss
$primary-color: #10b981;
$secondary-color: #059669;
```

**红色主题**：
```scss
$primary-color: #ef4444;
$secondary-color: #dc2626;
```

---

## 🚀 高级功能

### 图标搜索

#### 按名称搜索

在搜索框输入关键词，实时过滤图标：

```
搜索 "docker" → 显示所有名称包含 docker 的图标
```

#### 按分类筛选

使用下拉菜单选择特定分类：

```
选择 "AI" → 只显示 AI 分类的图标
```

#### 组合搜索

先选择分类，再输入关键词：

```
分类：Docker + 搜索：portainer → 精确查找
```

### 图标链接复制

#### 获取图标 URL

1. 点击任意图标
2. 链接自动复制到剪贴板
3. 粘贴到需要的地方

#### URL 格式

```
https://your-domain.com/icon/分类名称/图标名称.扩展名
```

示例：
```
https://icons.gw124.top/icon/AI/ChatGPT.png
```

#### 使用场景

**在 Homepage 中使用**：
```yaml
- name: ChatGPT
  icon: https://icons.gw124.top/icon/AI/ChatGPT.png
  href: https://chat.openai.com
```

**在 Organizr 中使用**：
```
直接粘贴图标 URL
```

**在自定义 HTML 中使用**：
```html
<img src="https://icons.gw124.top/icon/AI/ChatGPT.png" alt="ChatGPT">
```

### 监听文件变化

开发时自动监听图标文件变化：

```bash
npm run watch
```

当你添加、删除或修改图标文件时，会自动重新扫描。

### 配置验证

验证配置文件格式：

```bash
npm run config:validate
```

输出示例：
```
✅ 配置文件格式正确
✅ 所有必需字段已填写
✅ 域名格式正确
```

---

## ⚡ 性能优化

### 图片优化

#### 转换为 WebP

WebP 格式体积更小，质量相同：

```bash
npm run optimize-images
```

这会：
1. 扫描所有 PNG/JPG 图片
2. 生成 WebP 版本
3. 保留原始图片
4. 自动降级支持

**效果**：
- 体积减少 30-50%
- 现代浏览器自动使用 WebP
- 旧浏览器使用原始图片

#### 手动压缩图片

使用在线工具：
- [TinyPNG](https://tinypng.com/) - PNG 压缩
- [Squoosh](https://squoosh.app/) - 多格式压缩
- [ImageOptim](https://imageoptim.com/) - Mac 客户端

### 缓存策略

#### Service Worker 缓存

项目已内置 Service Worker，实现：
- 图标缓存 30 天
- 离线访问支持
- 后台自动更新

#### 浏览器缓存

如果你使用 Apache，`.htaccess` 文件已配置：
- 图标缓存 30 天
- CSS/JS 缓存 7 天
- Gzip 压缩

如果你使用 Nginx，参考 `nginx.conf.example`。

### 懒加载

项目已内置懒加载，特性：
- 只加载可见区域图标
- 滚动时自动加载
- 减少初始加载时间 70%

### 优化构建

使用优化构建获得最佳性能：

```bash
npm run build:optimized
```

包含：
- WebP 转换
- Gzip 压缩
- 代码分割
- Tree shaking
- 资源压缩

---

## 🔧 问题排查

### 图标问题

#### 图标不显示

**检查清单**：
1. ✅ 文件格式是否支持（png, jpg, svg, webp）
2. ✅ 文件名是否包含特殊字符
3. ✅ 是否运行了 `npm run scan-icons`
4. ✅ 浏览器控制台是否有错误

**解决步骤**：
```bash
# 1. 验证文件
ls -la "public/icon/分类名称/"

# 2. 重新扫描
npm run scan-icons

# 3. 检查 db.json
cat public/db.json | grep "图标名称"

# 4. 清除缓存并刷新浏览器
```

#### 图标加载很慢

**原因分析**：
- 图片文件过大
- 网络速度慢
- 未启用优化

**解决方案**：
```bash
# 1. 压缩图片
npm run optimize-images

# 2. 使用优化构建
npm run build:optimized

# 3. 检查 Service Worker
# F12 > Application > Service Workers
```

### 配置问题

#### 配置不生效

**检查步骤**：
```bash
# 1. 验证配置文件
npm run config:validate

# 2. 检查语法
cat config.yml

# 3. 重新构建
npm run build
```

#### 版权年份不正确

检查 `config.yml`：
```yaml
copyright:
  startDate: "2024-01-01"  # 确保日期正确
  autoRange: true          # 确保为 true
```

### 部署问题

#### GitHub Actions 失败

1. 查看 Actions 日志
2. 检查配置文件语法
3. 确认权限设置

#### 自定义域名不生效

1. 检查 DNS 设置
2. 添加 CNAME 记录：
   ```
   icons.yourdomain.com -> yourusername.github.io
   ```
3. 等待 DNS 传播（最多 24 小时）

#### 图标链接 404

**原因**：
- 部署分支不正确
- 路径大小写问题
- 文件未上传

**解决**：
```bash
# 检查部署分支
git branch -a

# 检查文件是否存在
ls dist/icon/
```

### 性能问题

#### 首次加载慢

**正常现象**：
- 首次访问需要下载资源
- 建立缓存需要时间

**优化方法**：
```bash
# 使用优化构建
npm run build:optimized
```

#### 二次访问仍然慢

**检查缓存**：
1. F12 打开开发者工具
2. Application > Service Workers
3. 确认状态为 "activated"
4. Network 标签查看是否 "from cache"

**清除缓存重试**：
```
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## 💡 最佳实践

### 图标管理

1. **统一命名规范**：使用清晰的命名方式
2. **合理分类**：不要创建太多分类
3. **控制数量**：每个分类不超过 100 个图标
4. **定期清理**：删除不用的图标

### 性能优化

1. **使用 WebP**：体积更小，质量相同
2. **启用缓存**：Service Worker + HTTP 缓存
3. **压缩图片**：保持文件在 100KB 以内
4. **懒加载**：默认已启用，无需配置

### 部署建议

1. **使用 CDN**：GitHub Pages 自带 CDN
2. **启用 HTTPS**：GitHub Pages 自动支持
3. **自定义域名**：提升专业度
4. **自动部署**：使用 GitHub Actions

### 安全建议

1. **不要上传敏感信息**：配置文件不要包含密码
2. **检查文件**：上传前检查图标文件
3. **定期更新**：保持依赖最新
4. **备份数据**：定期备份图标文件

---

## 📚 参考资源

### 官方文档
- [Vue 3 文档](https://vuejs.org/)
- [Element Plus 文档](https://element-plus.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

### 图标资源
- [Iconfont](https://www.iconfont.cn/)
- [Iconify](https://iconify.design/)
- [Flaticon](https://www.flaticon.com/)
- [Icons8](https://icons8.com/)

### 图片优化工具
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

### 部署平台
- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

---

## 🎯 下一步

- 📖 阅读 [README.md](README.md) 了解项目概述
- 🚀 查看 [DEPLOY.md](DEPLOY.md) 学习部署方法
- 💡 参考 [API.md](API.md) 了解技术细节

---

**有问题？** 提交 [Issue](https://github.com/GWen124/IconsHub/issues) 获取帮助！


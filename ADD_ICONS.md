# 添加新图标指南

## 🎯 简单 3 步添加图标

### 方法 1：本地添加（推荐）

```bash
# 1. 添加图标文件
cp your-icon.png public/icon/分类名称/

# 2. 扫描图标（更新 db.json）
npm run scan-icons

# 3. 提交推送
git add public/icon/ public/db.json
git commit -m "add: 添加新图标"
git push origin main
```

**就这么简单！** GitHub Actions 会自动部署。

---

### 方法 2：直接在 GitHub 网页添加（推荐用于协作）

1. 进入仓库：https://github.com/GWen124/IconsHub
2. 导航到：`public/icon/分类名称/`
3. 点击 **Add file** > **Upload files**
4. 上传图标文件
5. 填写提交信息，点击提交

**✨ 新功能**：GitHub Actions 会**自动扫描并更新 `db.json`**！

**工作流程**：
```
上传图标 → 推送到 GitHub → GitHub Actions 自动扫描 
→ 自动提交 db.json → 构建部署 → 图标显示在网站 ✅
```

**适用场景**：
- 🤝 多人协作维护
- 📱 在手机或其他设备上添加图标
- 🌐 无需本地环境即可贡献

---

## ❓ 为什么需要更新 db.json？

### 网站的工作原理

```
用户访问网站
    ↓
加载 db.json
    ↓
读取图标列表
    ↓
显示图标
```

**db.json 示例**：
```json
{
  "Self-Hosted Services": [
    {
      "name": "Sunpanel_A",
      "type": "png",
      "ext": ".png",
      "course": ""
    }
  ]
}
```

如果 `db.json` 中没有这个图标，网站就不会显示它！

---

## ✅ 添加流程（两种方式）

### 方式 A：本地添加（有开发环境）

```bash
# 1. 进入项目目录
cd /Users/Wen/File/GitHub/IconsHub

# 2. 拉取最新代码
git pull origin main

# 3. 添加新图标
cp ~/Downloads/NewIcon.png "public/icon/App Hub/"

# 4. 扫描图标（生成 db.json）
npm run scan-icons

# 5. 提交（包括 db.json）
git add public/icon/ public/db.json
git commit -m "add: 添加 NewIcon 图标"
git push origin main

# 6. 等待部署（3-5分钟）
```

### 方式 B：GitHub 网页添加（无需本地环境）✨

```
1. 访问 https://github.com/GWen124/IconsHub
2. 进入 public/icon/分类名称/
3. 点击 "Add file" > "Upload files"
4. 拖拽或选择图标文件
5. 填写提交信息，点击 "Commit changes"
6. 等待 5-10 分钟

✅ GitHub Actions 会自动：
   - 扫描新图标
   - 更新 db.json
   - 自动提交 db.json
   - 构建并部署
```

**完全自动化！不需要任何手动操作！** 🎉

---

## 🎯 两种添加方式对比

| 特性 | 方式 A：本地添加 | 方式 B：GitHub 网页 |
|------|-----------------|-------------------|
| **需要环境** | 需要 Node.js | 只需浏览器 ✅ |
| **速度** | 立即验证 | 等待 Actions |
| **db.json** | 手动更新 | **自动更新** ✅ |
| **适合场景** | 开发者 | 所有人 ✅ |
| **协作友好** | 一般 | 非常友好 ✅ |

**推荐**：如果你有多人协作或在其他设备上，使用**方式 B**！

---

## 🔧 批量添加图标

### 添加多个图标

```bash
# 1. 复制多个图标到同一分类
cp ~/Downloads/*.png "public/icon/App Hub/"

# 2. 扫描（一次性更新所有）
npm run scan-icons

# 3. 提交
git add public/icon/ public/db.json
git commit -m "add: 批量添加图标"
git push
```

### 添加到多个分类

```bash
# 1. 分别复制到不同分类
cp icon1.png "public/icon/App Hub/"
cp icon2.png "public/icon/AI/"
cp icon3.png "public/icon/Docker/"

# 2. 扫描
npm run scan-icons

# 3. 提交（一次性提交所有改动）
git add public/icon/ public/db.json
git commit -m "add: 添加多个分类的图标"
git push
```

---

## 💡 理解 GitHub Actions 的工作流程

### 当前的部署流程

```yaml
步骤 1: Checkout code         # 拉取代码
步骤 2: Install dependencies   # 安装依赖
步骤 3: Build project          # 构建项目
  ↓ 执行: npm run build
  ↓ 自动运行: npm run scan-icons
  ↓ 同步配置，扫描图标
步骤 4: Deploy                # 部署
```

### 问题所在

如果你**只提交图标文件**：
```
GitHub Actions 拉取代码
    ↓
代码中有新图标文件
    ↓
但 db.json 是旧的
    ↓
scan-icons 会生成新的 db.json
    ↓
但这个新 db.json 只存在于构建环境
    ↓
不会自动提交回仓库！
```

### 解决方案

**你需要在本地运行 `npm run scan-icons` 并提交 `db.json`**。

---

## 🎯 最佳实践

### 开发工作流

```bash
# 日常添加图标的流程
add_icon() {
  # 1. 拉取最新代码
  git pull origin main
  
  # 2. 添加图标
  # 手动复制或使用命令
  
  # 3. 扫描更新
  npm run scan-icons
  
  # 4. 提交推送
  git add public/icon/ public/db.json
  git commit -m "add: 添加新图标"
  git push origin main
}
```

---

## 🚀 未来改进方案（可选）

如果你想让 GitHub Actions **自动提交 `db.json` 回仓库**，可以这样配置：

### 方案：自动提交更新

修改 `.github/workflows/build.yml`：

```yaml
- name: Scan icons and update db.json
  run: |
    npm run scan-icons
    
    # 检查是否有改动
    if ! git diff --quiet public/db.json; then
      echo "📝 db.json 有更新，自动提交"
      git config --local user.email "github-actions[bot]@users.noreply.github.com"
      git config --local user.name "github-actions[bot]"
      git add public/db.json public/category-titles.json public/config.yml
      git commit -m "chore: 自动更新 db.json [skip ci]"
      git push
    else
      echo "✅ db.json 无变化"
    fi

- name: Build project
  run: npm run build
```

**优点**：
- ✅ 只需提交图标文件
- ✅ `db.json` 自动更新并提交
- ✅ 完全自动化

**缺点**：
- ⚠️ 会产生额外的提交记录
- ⚠️ 可能导致提交历史混乱

---

## 💡 我的建议

### 推荐方案：保持当前流程

**手动运行 `npm run scan-icons` 并提交 `db.json`**

**理由**：
1. ✅ 提交历史清晰
2. ✅ 可以在提交前本地验证
3. ✅ 避免自动提交带来的问题
4. ✅ 流程简单，只需一个命令

**流程**：
```bash
# 添加图标后
npm run scan-icons
git add public/icon/ public/db.json
git commit -m "add: 添加图标"
git push
```

---

## 📋 快速参考

### 添加单个图标
```bash
cp icon.png "public/icon/分类/"
npm run scan-icons
git add public/icon/ public/db.json
git commit -m "add: 添加 icon"
git push
```

### 添加多个图标
```bash
cp *.png "public/icon/分类/"
npm run scan-icons
git add public/icon/ public/db.json
git commit -m "add: 批量添加图标"
git push
```

### 删除图标
```bash
rm "public/icon/分类/icon.png"
npm run scan-icons
git add public/icon/ public/db.json
git commit -m "remove: 删除 icon"
git push
```

---

## 🎉 总结

### ✨ 全自动化已实现！

**新功能**：
- ✅ GitHub Actions 自动扫描图标
- ✅ 自动更新 `db.json`
- ✅ **自动提交 `db.json` 回仓库**
- ✅ 自动构建并部署

### 🚀 你现在可以这样做：

**方式 1 - 本地添加**：
```bash
cp icon.png "public/icon/分类/"
npm run scan-icons
git add public/icon/ public/db.json
git commit -m "add: 添加图标"
git push
```

**方式 2 - GitHub 网页添加（推荐）**：
```
直接在 GitHub 网页上传图标文件
→ GitHub Actions 自动处理一切
→ 5-10 分钟后图标出现在网站 ✅
```

### 🤝 完美支持多人协作

任何有权限的人都可以：
- 直接在 GitHub 网页上传图标
- 无需本地环境
- 无需手动更新 `db.json`
- 系统自动处理一切！

**这就是你想要的方案！** 🎊


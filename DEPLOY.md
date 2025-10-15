# GitHub Pages 部署指南

本项目支持自动部署到 GitHub Pages 的 Web 分支。

## 🚀 部署方式

### 1. 自动部署（推荐）

#### GitHub Actions 自动部署
- 推送到 `main` 分支时自动触发
- 自动扫描图标、构建并部署到 `Web` 分支
- 无需手动操作

#### 手动触发部署
1. 在 GitHub 仓库页面
2. 点击 "Actions" 标签
3. 选择 "Deploy to GitHub Pages" 工作流
4. 点击 "Run workflow"

### 2. 本地部署

#### 快速部署
```bash
# 一键部署到 Web 分支
npm run deploy:local
```

#### 分步部署
```bash
# 1. 扫描图标
npm run scan-icons

# 2. 构建项目
npm run build

# 3. 手动部署到 Web 分支
git checkout Web
cp -r dist/* .
git add .
git commit -m "Deploy update"
git push origin Web
```

## 📋 部署流程

### 自动部署流程
1. **触发条件**：推送到 main 分支
2. **扫描图标**：自动扫描 `public/icon/` 文件夹
3. **构建项目**：生成生产版本
4. **部署到 Web 分支**：自动提交并推送
5. **GitHub Pages 更新**：几分钟后网站自动更新

### 本地部署流程
1. **扫描图标**：`npm run scan-icons`
2. **构建项目**：`npm run build`
3. **切换到 Web 分支**：`git checkout Web`
4. **复制构建文件**：将 `dist/` 内容复制到根目录
5. **提交推送**：`git add . && git commit && git push`

## ⚙️ 配置说明

### GitHub Pages 设置
1. 进入仓库 Settings
2. 找到 "Pages" 设置
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "Web"
5. 保存设置

### 分支结构
- **main 分支**：源代码和开发文件
- **Web 分支**：部署的静态文件（GitHub Pages 使用）

## 🔧 开发工作流

### 日常开发
1. 在 `main` 分支开发
2. 添加图标到 `public/icon/` 文件夹
3. 提交代码到 `main` 分支
4. GitHub Actions 自动部署到 `Web` 分支

### 手动部署
```bash
# 添加图标后
npm run scan-icons

# 本地部署
npm run deploy:local
```

## 📊 部署状态

### 检查部署状态
1. 访问 GitHub Actions 页面
2. 查看 "Deploy to GitHub Pages" 工作流状态
3. 绿色 ✓ 表示部署成功
4. 红色 ✗ 表示部署失败

### 查看部署日志
1. 点击失败的部署任务
2. 查看详细错误信息
3. 根据错误信息修复问题

## 🛠️ 故障排除

### 常见问题

#### 1. 部署失败
- 检查 Node.js 版本兼容性
- 确认所有依赖已安装
- 查看构建日志中的错误信息

#### 2. 图标未更新
- 确认图标文件已添加到 `public/icon/` 文件夹
- 运行 `npm run scan-icons` 重新扫描
- 检查 `db.json` 文件是否更新

#### 3. 网站无法访问
- 检查 GitHub Pages 设置
- 确认 Web 分支存在且有内容
- 等待几分钟让 GitHub Pages 更新

### 调试命令
```bash
# 检查构建结果
npm run build
ls -la dist/

# 检查 Git 状态
git status
git branch -a

# 检查 Web 分支
git checkout Web
ls -la
```

## 📝 注意事项

1. **不要直接编辑 Web 分支**：Web 分支由自动部署管理
2. **保持 main 分支干净**：只提交源代码，不提交构建文件
3. **定期更新依赖**：保持项目依赖的最新版本
4. **监控部署状态**：定期检查 GitHub Actions 状态

## 🎯 最佳实践

1. **使用自动部署**：推送到 main 分支自动触发部署
2. **测试本地构建**：部署前先本地测试 `npm run build`
3. **版本控制**：使用有意义的提交信息
4. **监控更新**：定期检查网站是否正常更新

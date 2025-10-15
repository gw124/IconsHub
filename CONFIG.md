# 配置文件使用说明

## 📋 概述

项目现在支持通过 `config.yml` 文件进行配置管理，包括网站信息、部署设置、UI主题等。GitHub Actions 工作流也支持手动输入参数来覆盖配置文件中的设置。

## ⚙️ 配置文件结构

### 网站基本信息
```yaml
site:
  title: "Icon 图标库"
  description: "提供在线图标链接，用于个人NAS设备显示使用，禁止用于商业用途"
  author: "GWen124"
  url: "https://icons.gw124.top"
```

### 部署配置
```yaml
deployment:
  branch: "Web"                    # 部署分支
  domain: "icons.gw124.top"        # 域名
  cname: "icons.gw124.top"         # CNAME记录
  commit_message: "🚀 Auto deploy: Update icons and rebuild"  # 提交信息
```

### 图标配置
```yaml
icons:
  formats: ["png", "jpg", "jpeg", "svg", "webp"]  # 支持的格式
  default_type: "png"              # 默认类型
  size: 64                         # 图标尺寸
  lazy_load: true                  # 懒加载
```

### UI配置
```yaml
ui:
  primary_color: "#6366f1"         # 主色调
  secondary_color: "#4f46e5"       # 次色调
  card_style: "modern"             # 卡片样式
  show_count: true                 # 显示数量
  items_per_page: 50               # 每页数量
```

## 🚀 GitHub Actions 手动配置

### 手动触发部署

在 GitHub 仓库页面，您可以手动触发部署并自定义参数：

1. 进入 **Actions** 标签页
2. 选择 **CI Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** 按钮
4. 填写可选参数：

#### 可选参数

- **自定义域名**: 覆盖配置文件中的域名
- **部署分支**: 覆盖配置文件中的分支（默认：Web）
- **提交信息**: 覆盖配置文件中的提交信息

### 参数优先级

1. **手动输入参数** (最高优先级)
2. **配置文件设置**
3. **默认值** (最低优先级)

## 🔧 本地配置管理

### 验证配置
```bash
# 验证配置文件格式和内容
npm run config:validate
```

### 加载配置
```bash
# 测试配置加载
npm run config:load
```

### 修改配置

1. 编辑 `config.yml` 文件
2. 运行 `npm run config:validate` 验证
3. 提交更改到仓库

## 📝 配置示例

### 更换域名
```yaml
deployment:
  domain: "my-new-domain.com"
  cname: "my-new-domain.com"
```

### 更换部署分支
```yaml
deployment:
  branch: "gh-pages"
```

### 自定义提交信息
```yaml
deployment:
  commit_message: "🎨 更新图标库 - 添加新图标"
```

### 修改主题颜色
```yaml
ui:
  primary_color: "#ff6b6b"
  secondary_color: "#4ecdc4"
```

## 🛠️ 工作流配置

### 自动部署
- **触发条件**: 推送到 `main` 分支
- **配置来源**: `config.yml` 文件
- **部署目标**: 配置文件中的分支和域名

### 手动部署
- **触发方式**: GitHub Actions 手动触发
- **配置来源**: 手动输入参数或 `config.yml` 文件
- **灵活性**: 支持临时覆盖配置

## 🔍 故障排除

### 配置验证失败
```bash
npm run config:validate
```
检查错误信息并修复配置文件。

### 工作流失败
1. 检查 GitHub Actions 日志
2. 确认配置文件格式正确
3. 验证域名和分支设置

### 域名不生效
1. 确认 DNS 设置正确
2. 检查 CNAME 记录
3. 等待 DNS 传播（最多24小时）

## 📚 最佳实践

1. **版本控制**: 将 `config.yml` 提交到仓库
2. **验证配置**: 修改后运行验证脚本
3. **测试部署**: 使用手动触发测试配置
4. **备份配置**: 重要修改前备份配置文件
5. **文档更新**: 修改配置后更新相关文档

## 🎯 使用场景

### 开发环境
- 修改 `development.port` 调整端口
- 设置 `development.debug` 启用调试

### 生产部署
- 配置 `deployment.domain` 设置域名
- 调整 `deployment.branch` 选择分支

### UI定制
- 修改 `ui.primary_color` 更换主题色
- 调整 `ui.card_style` 改变卡片样式

### 功能控制
- 设置 `features.copy_enabled` 控制复制功能
- 配置 `search.enabled` 启用/禁用搜索

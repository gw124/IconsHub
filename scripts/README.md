# 图标自动扫描工具

这个工具集可以帮助您自动管理图标数据，无需手动维护 JSON 文件。

## 🚀 功能特性

- ✅ **自动扫描** - 自动扫描 `public/icon/` 文件夹
- ✅ **实时监控** - 监控文件夹变化并自动更新
- ✅ **智能排序** - 按字母顺序自动排序分类和图标
- ✅ **格式支持** - 支持 PNG、JPG、SVG、WebP 等格式
- ✅ **类型识别** - 自动识别 SVG 和其他图片格式

## 📋 可用命令

### 基础命令
```bash
# 扫描一次图标文件夹并生成数据
npm run scan-icons

# 启动开发服务器（先扫描再启动）
npm run dev
```

### 高级命令
```bash
# 监控文件夹变化（需要 chokidar）
npm run watch-icons

# 开发模式 + 实时监控
npm run dev:watch
```

## 🔧 使用方法

### 1. 添加新图标
1. 将图标文件放入对应的分类文件夹（如 `public/icon/AI/`）
2. 运行 `npm run scan-icons` 更新数据
3. 刷新浏览器查看新图标

### 2. 添加新分类
1. 在 `public/icon/` 下创建新文件夹
2. 将图标文件放入新文件夹
3. 运行 `npm run scan-icons` 更新数据
4. 在 `public/category-titles.json` 中添加分类标题

### 3. 实时开发
```bash
# 启动实时监控模式
npm run dev:watch
```
这样当您添加、删除或修改图标文件时，数据会自动更新。

## 📁 文件结构

```
scripts/
├── scan-icons.js          # 基础扫描脚本
├── watch-icons.js         # 实时监控脚本
├── generate-icon-list.js  # 简化版图标列表生成
└── README.md              # 说明文档

public/
├── icon/                  # 图标文件夹
│   ├── AI/               # 分类文件夹
│   ├── Analytics/        # 分类文件夹
│   └── ...
├── db.json               # 生成的图标数据
└── category-titles.json  # 分类标题配置
```

## ⚙️ 配置说明

### 支持的图片格式
- PNG (.png)
- JPEG (.jpg, .jpeg)
- SVG (.svg)
- WebP (.webp)

### 自动排序规则
- 分类按字母顺序排序
- 图标按文件名排序
- 忽略隐藏文件（以 `.` 开头）

## 🐛 故障排除

### 扫描失败
```bash
# 检查文件夹权限
ls -la public/icon/

# 手动运行扫描
node scripts/scan-icons.js
```

### 监控不工作
```bash
# 安装依赖
npm install chokidar

# 检查文件变化
npm run watch-icons
```

## 💡 最佳实践

1. **命名规范** - 使用清晰的图标文件名
2. **分类管理** - 保持分类文件夹结构清晰
3. **定期扫描** - 定期运行扫描命令
4. **版本控制** - 将生成的 `db.json` 加入版本控制

## 🔄 工作流程

1. 添加图标文件到对应分类文件夹
2. 运行 `npm run scan-icons` 更新数据
3. 在 `category-titles.json` 中配置分类标题
4. 启动开发服务器查看效果

这样您就可以专注于图标管理，而不用手动维护 JSON 数据了！

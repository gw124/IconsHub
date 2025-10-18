# Footer 配置说明

## 📌 Footer 链接配置规则

### ✅ 可配置项

#### ICONS.GW124.TOP 链接
**位置**: `config.yml` → `footer.websiteUrl`

```yaml
footer:
  websiteText: "ICONS.GW124.TOP"
  websiteUrl: "https://github.com/GWen124/IconsHub"  # 可修改
```

**用途**: 网站名称的外链
**默认值**: `https://github.com/GWen124/IconsHub`
**可修改**: ✅ 是

---

### 🔒 固定项（不可配置）

#### Wen 链接
**位置**: 固定在 `src/views/index.vue` 代码中

```vue
<a href="https://gw124.top/" target="_blank" rel="noopener noreferrer">Wen</a>
```

**用途**: 作者署名链接
**固定链接**: `https://gw124.top/`
**可修改**: ❌ 否（硬编码在代码中）

---

## 🎯 Footer 显示效果

```
Copyright © 2025 ICONS.GW124.TOP • Powered by Wen
                    ↓ 可配置              ↓ 固定
           链接到配置的 URL          链接到 gw124.top
```

---

## 📝 修改方法

### 修改 ICONS.GW124.TOP 链接

1. 编辑 `config.yml` 文件：
```yaml
footer:
  websiteText: "ICONS.GW124.TOP"
  websiteUrl: "https://your-new-link.com"  # 修改这里
```

2. 提交并推送：
```bash
git add config.yml
git commit -m "chore: 更新 footer 链接"
git push
```

3. 等待 GitHub Actions 部署完成

### ⚠️ Wen 链接不可修改

Wen 的链接 `https://gw124.top/` 已固定在代码中，任何配置文件的修改都不会影响它。

**原因**：
- 保护作者署名
- 确保链接稳定性
- 避免误修改

---

## 🔍 技术实现

### 配置文件 (config.yml)
```yaml
footer:
  websiteText: "ICONS.GW124.TOP"
  websiteUrl: "https://github.com/GWen124/IconsHub"
  # 注意：Wen 链接已固定在代码中，不可通过配置修改
```

### 代码实现 (src/views/index.vue)
```vue
<div class="footer-line">
  Copyright © {{ copyrightYear }} 
  <!-- 可配置的链接 -->
  <a :href="appConfig.footer.websiteUrl" target="_blank">
    {{ appConfig.footer.websiteText }}
  </a> 
  • Powered by 
  <!-- 固定的链接（硬编码） -->
  <a href="https://gw124.top/" target="_blank">
    Wen
  </a>
</div>
```

### TypeScript 类型定义
```typescript
export interface FooterConfig {
  websiteText: string;
  websiteUrl: string;
  // 注意：authorText 和 authorUrl 已从配置中移除，固定在代码中
}
```

---

## 📊 配置对比

| 项目 | 可配置 | 配置位置 | 默认值 |
|------|--------|----------|--------|
| **网站名称文字** | ✅ | `config.yml` → `footer.websiteText` | ICONS.GW124.TOP |
| **网站名称链接** | ✅ | `config.yml` → `footer.websiteUrl` | https://github.com/GWen124/IconsHub |
| **作者名称** | ❌ | 硬编码 | Wen |
| **作者链接** | ❌ | 硬编码 | https://gw124.top/ |

---

## 🎯 使用场景

### 场景 1: 修改网站链接
如果你想将 ICONS.GW124.TOP 链接到其他页面：

```yaml
footer:
  websiteUrl: "https://your-custom-link.com"
```

### 场景 2: 修改网站显示文字
如果你想修改显示的文字：

```yaml
footer:
  websiteText: "My Icon Hub"
```

### 场景 3: 尝试修改 Wen 链接
❌ **不可行** - Wen 链接已固定在代码中

如果需要修改，必须：
1. 编辑 `src/views/index.vue` 源代码
2. 修改硬编码的 `https://gw124.top/`
3. 重新构建和部署

**不推荐这样做**，因为这是作者署名链接。

---

## 🛡️ 为什么 Wen 链接不可配置？

### 1. 保护作者署名
- 确保原作者信息不被篡改
- 符合开源协议要求

### 2. 稳定性
- 避免误操作导致链接错误
- 保持项目的一致性

### 3. 简化配置
- 减少不必要的配置项
- 降低配置出错的可能性

---

## 📚 相关文件

- **配置文件**: `config.yml`
- **组件代码**: `src/views/index.vue`
- **类型定义**: `src/utils/configLoader.ts`
- **配置说明**: `CONFIG.md`

---

## 💡 总结

- ✅ **ICONS.GW124.TOP 链接可配置** - 通过 `config.yml` 修改
- 🔒 **Wen 链接不可配置** - 固定在代码中
- 📝 **修改配置后需要重新部署** - GitHub Actions 自动处理
- 🎯 **尊重原作者署名** - 不要修改 Wen 的链接

---

**如有问题，请提交 Issue 到 GitHub 仓库** 🚀


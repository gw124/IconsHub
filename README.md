# My Icon


# 目录

[一、简介](#一简介)

[二、展示](#二链接)

[三、使用](#三使用)

[四、分类](#四分类)

[五、本地运行](#五本地运行)

[六、Docker部署](#六Docker部署)

# 一、简介

基于[heizicao/My Icon](https://gitee.com/heizicao/my-icon)修改，提供在线图标链接，用于个人NAS设备显示使用，禁止用于商业用途

# 二、展示

https://siriling.github.io/my-icons/dist

![show](public/screenshot.png)


# 三、使用

- 点击相应图标即可获取URL

- 点击相应图标即可查看部署教程

- 打开CDN开关，可转换为CDN链接

# 四、分类
- Docker容器（docker）
- 路由器（router）
- 虚拟机（vms）
- 项目（project）
- 其他（other）

# 五、本地运行

下载安装node.js，在CMD运行以下两个命令，然后在浏览器打开http://localhost:8080

```shell
npm install
npm run serve
```

## 性能优化构建

针对 1500+ 图标的加载优化，提供以下构建方式：

### 标准构建
```shell
npm run build
```

### 优化构建（推荐）
```shell
# 包含图片 WebP 转换 + 压缩优化
npm run build:optimized
```

### 仅优化图片
```shell
npm run optimize-images
```

**优化效果**：
- 首次加载时间减少 60-80%
- 二次访问接近即时加载
- 图片体积减少 30-50%
- 支持离线缓存

详细优化说明请查看 [OPTIMIZATION.md](./OPTIMIZATION.md)

# 六、Docker部署

1. Docker部署Nginx服务
2. 下载dist文件夹
3. 放到Nginx的www文件夹中
4. 将图标放入icon文件夹
5. 修改db.json








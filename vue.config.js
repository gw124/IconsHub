const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = defineConfig({
  //打包配置文件
  publicPath:  './',// 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "./assets", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

  configureWebpack: {
    performance: {
      hints: "warning", // 警告 webpack 的性能提示
      maxEntrypointSize: 50000000, // 入口起点的最大体积
      maxAssetSize: 30000000, // 生成文件的最大体积
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
    plugins: process.env.NODE_ENV === 'production' ? [
      // Gzip 压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg|json)$/,
        threshold: 10240, // 大于 10KB 的文件才压缩
        minRatio: 0.8,
      }),
    ] : [],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          elementPlus: {
            name: 'chunk-element-plus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            priority: 20,
          },
        },
      },
    },
  },
  
  chainWebpack: config => {
    // 图片压缩和优化
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096, // 小于 4KB 转为 base64
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
          },
        },
      })
      .end()
    
    // 预加载优化
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])
    
    // 预获取优化
    config.plugin('prefetch').tap(() => [
      {
        rel: 'prefetch',
        fileBlacklist: [/\.map$/, /hot-update\.js$/],
      },
    ])
    
    // HTML 优化
    config.plugin('html').tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
      }
      return args
    })
  },
  
  //修改favicon.ico
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
    workboxOptions: {
      // Service Worker 缓存策略
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          // 图标缓存策略 - 优先使用缓存
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'icon-cache',
            expiration: {
              maxEntries: 2000,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          // API 和数据缓存策略 - 网络优先
          urlPattern: /\.(?:json)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'data-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 60, // 5 分钟
            },
          },
        },
      ],
    },
  },
  
  devServer: {
    // 开发服务器配置
    compress: true,
  },
})

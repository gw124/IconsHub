import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//控制console.log输出
// const isDev = process.env.NODE_ENV !== 'production';
// window.console.log = isDev ? console.log.bind(console) : () => {};

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

// 注册 Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker 注册成功:', registration.scope);
        
        // 检测更新
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🔄 发现新版本，准备更新...');
                // 可以在这里提示用户刷新页面
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Service Worker 注册失败:', error);
      });
  });
}

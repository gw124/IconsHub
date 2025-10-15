const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * 简单的文件监控脚本
 * 监控 public/icon 文件夹变化并自动扫描
 */
function startSimpleWatch() {
    console.log('👀 启动简单监控模式...');
    console.log('📁 监控目录: public/icon/');
    
    const iconDir = path.join(__dirname, '../public/icon');
    let timeout;
    
    // 使用 fs.watch 监控文件夹
    const watcher = fs.watch(iconDir, { recursive: true }, (eventType, filename) => {
        if (filename && !filename.startsWith('.')) {
            console.log(`📝 检测到变化: ${filename}`);
            
            // 防抖：避免频繁触发
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                console.log('🔄 自动扫描图标...');
                exec('npm run scan-icons', (error, stdout, stderr) => {
                    if (error) {
                        console.error('❌ 扫描失败:', error);
                        return;
                    }
                    console.log('✅ 图标数据已自动更新');
                });
            }, 1000); // 1秒防抖
        }
    });
    
    console.log('🎯 监控已启动！现在添加图标文件会自动扫描');
    console.log('🛑 按 Ctrl+C 停止监控');
    
    // 优雅关闭
    process.on('SIGINT', () => {
        console.log('\n👋 停止监控...');
        watcher.close();
        process.exit(0);
    });
}

// 如果直接运行此脚本
if (require.main === module) {
    startSimpleWatch();
}

module.exports = { startSimpleWatch };

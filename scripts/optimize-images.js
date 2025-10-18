const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 图片优化脚本 - 将 PNG 转换为 WebP 格式
 * 注意：需要安装 sharp 库
 */

async function optimizeImages() {
    console.log('🖼️  开始优化图片...');
    
    try {
        // 检查是否安装了 sharp
        try {
            require.resolve('sharp');
        } catch (e) {
            console.log('📦 正在安装 sharp 库...');
            execSync('npm install --save-dev sharp', { stdio: 'inherit' });
        }
        
        const sharp = require('sharp');
        const iconDir = path.join(__dirname, '../public/icon');
        
        // 统计数据
        let totalImages = 0;
        let optimizedImages = 0;
        let originalSize = 0;
        let optimizedSize = 0;
        
        // 递归处理文件夹
        async function processDirectory(dir) {
            const items = fs.readdirSync(dir, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(dir, item.name);
                
                if (item.isDirectory()) {
                    await processDirectory(fullPath);
                } else if (item.isFile()) {
                    const ext = path.extname(item.name).toLowerCase();
                    
                    // 只处理 PNG 和 JPEG 图片
                    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                        totalImages++;
                        
                        const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
                        
                        // 如果 WebP 文件已存在，跳过
                        if (fs.existsSync(webpPath)) {
                            continue;
                        }
                        
                        try {
                            const stats = fs.statSync(fullPath);
                            originalSize += stats.size;
                            
                            // 转换为 WebP 格式（高质量）
                            await sharp(fullPath)
                                .webp({ quality: 85, effort: 6 })
                                .toFile(webpPath);
                            
                            const webpStats = fs.statSync(webpPath);
                            optimizedSize += webpStats.size;
                            optimizedImages++;
                            
                            const savedPercent = ((stats.size - webpStats.size) / stats.size * 100).toFixed(2);
                            console.log(`✅ ${path.relative(iconDir, fullPath)} → WebP (节省 ${savedPercent}%)`);
                            
                        } catch (error) {
                            console.error(`❌ 处理失败: ${item.name}`, error.message);
                        }
                    }
                }
            }
        }
        
        await processDirectory(iconDir);
        
        console.log('\n📊 优化统计:');
        console.log(`   总图片数: ${totalImages}`);
        console.log(`   已优化: ${optimizedImages}`);
        console.log(`   原始大小: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   优化后大小: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   总节省: ${((originalSize - optimizedSize) / 1024 / 1024).toFixed(2)} MB (${((originalSize - optimizedSize) / originalSize * 100).toFixed(2)}%)`);
        console.log('\n🎉 图片优化完成！');
        
    } catch (error) {
        console.error('❌ 优化失败:', error.message);
        throw error;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };


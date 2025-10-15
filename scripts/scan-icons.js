const fs = require('fs');
const path = require('path');

/**
 * 自动扫描图标文件夹并生成数据
 */
function scanIcons() {
    const iconDir = path.join(__dirname, '../public/icon');
    const outputFile = path.join(__dirname, '../public/db.json');
    
    console.log('🔍 开始扫描图标文件夹...');
    
    try {
        // 读取所有分类文件夹
        const categories = fs.readdirSync(iconDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .filter(name => !name.startsWith('.')) // 过滤隐藏文件夹
            .sort(); // 按字母顺序排序
        
        console.log(`📁 发现 ${categories.length} 个分类文件夹:`, categories);
        
        const iconData = {};
        
        categories.forEach(category => {
            const categoryPath = path.join(iconDir, category);
            const files = fs.readdirSync(categoryPath, { withFileTypes: true })
                .filter(dirent => dirent.isFile())
                .map(dirent => dirent.name)
                .filter(name => {
                    const ext = path.extname(name).toLowerCase();
                    return ['.png', '.jpg', '.jpeg', '.svg', '.webp'].includes(ext);
                })
                .sort(); // 按文件名排序
            
            if (files.length > 0) {
                iconData[category] = files.map(file => {
                    const name = path.parse(file).name;
                    const ext = path.extname(file).toLowerCase();
                    const type = ext === '.svg' ? 'svg' : 'png';
                    
                    return {
                        name: name,
                        type: type,
                        course: "" // 默认空链接，可以后续手动添加
                    };
                });
                
                console.log(`✅ ${category}: ${files.length} 个图标`);
            }
        });
        
        // 写入 JSON 文件
        fs.writeFileSync(outputFile, JSON.stringify(iconData, null, 2), 'utf8');
        
        console.log('🎉 图标数据生成完成！');
        console.log(`📊 总计: ${Object.keys(iconData).length} 个分类, ${Object.values(iconData).reduce((total, items) => total + items.length, 0)} 个图标`);
        
        return iconData;
        
    } catch (error) {
        console.error('❌ 扫描失败:', error.message);
        throw error;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    scanIcons();
}

module.exports = { scanIcons };

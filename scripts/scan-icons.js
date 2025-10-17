const fs = require('fs');
const path = require('path');

/**
 * 自动扫描图标文件夹并生成数据
 */
function scanIcons() {
    const iconDir = path.join(__dirname, '../public/icon');
    const outputFile = path.join(__dirname, '../public/db.json');
    const categoryTitlesFile = path.join(__dirname, '../category-titles.json');
    
    console.log('🔍 开始扫描图标文件夹...');
    
    try {
        // 读取分类标题配置文件，获取排序顺序
        let categoryOrder = [];
        try {
            const categoryTitles = JSON.parse(fs.readFileSync(categoryTitlesFile, 'utf8'));
            categoryOrder = Object.keys(categoryTitles);
            console.log('📋 使用 category-titles.json 中的分类顺序');
        } catch (error) {
            console.log('⚠️ 无法读取 category-titles.json，使用字母顺序');
        }
        
        // 读取所有分类文件夹
        const allCategories = fs.readdirSync(iconDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .filter(name => !name.startsWith('.')); // 过滤隐藏文件夹
        
        // 按照 category-titles.json 的顺序排列，未定义的分类放在最后
        const categories = categoryOrder.length > 0 
            ? [...categoryOrder.filter(cat => allCategories.includes(cat)), 
               ...allCategories.filter(cat => !categoryOrder.includes(cat)).sort()]
            : allCategories.sort(); // 如果没有配置文件，使用字母顺序
        
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
                    const type = ext === '.svg' ? 'svg' : ext.substring(1); // 保留原始扩展名
                    
                    return {
                        name: name,
                        type: type,
                        ext: ext, // 添加原始扩展名
                        course: "" // 默认空链接，可以后续手动添加
                    };
                });
                
                console.log(`✅ ${category}: ${files.length} 个图标`);
            }
        });
        
        // 写入 JSON 文件
        fs.writeFileSync(outputFile, JSON.stringify(iconData, null, 2), 'utf8');
        
        // 复制 category-titles.json 到 public 目录
        const categoryTitlesSource = path.join(__dirname, '../category-titles.json');
        const categoryTitlesPublic = path.join(__dirname, '../public/category-titles.json');
        if (fs.existsSync(categoryTitlesSource)) {
            fs.copyFileSync(categoryTitlesSource, categoryTitlesPublic);
            console.log('📋 已同步 category-titles.json 到 public 目录');
        }
        
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

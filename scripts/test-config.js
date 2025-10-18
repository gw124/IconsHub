const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * 测试配置文件的所有字段是否能正确加载
 */
function testConfig() {
    console.log('🧪 开始测试配置文件...\n');
    
    const configPath = path.join(__dirname, '../config.yml');
    
    try {
        // 读取配置文件
        const configContent = fs.readFileSync(configPath, 'utf8');
        console.log('📄 配置文件内容:');
        console.log('─'.repeat(50));
        console.log(configContent);
        console.log('─'.repeat(50));
        console.log();
        
        // 解析配置
        const config = yaml.load(configContent);
        console.log('🔧 解析后的配置对象:');
        console.log(JSON.stringify(config, null, 2));
        console.log();
        
        // 验证所有字段
        console.log('✅ 字段验证:');
        console.log('─'.repeat(50));
        
        // site 配置
        console.log('📌 site.title:', config.site?.title || '❌ 未配置');
        console.log('📌 site.description:', config.site?.description || '❌ 未配置');
        console.log();
        
        // deployment 配置
        console.log('📌 deployment.branch:', config.deployment?.branch || '❌ 未配置');
        console.log('📌 deployment.domain:', config.deployment?.domain || '❌ 未配置');
        console.log();
        
        // copyright 配置
        console.log('📌 copyright.startDate:', config.copyright?.startDate || '❌ 未配置');
        console.log('📌 copyright.autoRange:', config.copyright?.autoRange !== undefined ? config.copyright.autoRange : '❌ 未配置');
        console.log();
        
        // footer 配置
        console.log('📌 footer.websiteText:', config.footer?.websiteText || '❌ 未配置');
        console.log('📌 footer.websiteUrl:', config.footer?.websiteUrl || '❌ 未配置');
        console.log();
        
        // 验证必需字段
        const requiredFields = [
            { path: 'site.title', value: config.site?.title },
            { path: 'site.description', value: config.site?.description },
            { path: 'deployment.branch', value: config.deployment?.branch },
            { path: 'deployment.domain', value: config.deployment?.domain },
            { path: 'copyright.startDate', value: config.copyright?.startDate },
            { path: 'copyright.autoRange', value: config.copyright?.autoRange },
            { path: 'footer.websiteText', value: config.footer?.websiteText },
            { path: 'footer.websiteUrl', value: config.footer?.websiteUrl }
        ];
        
        console.log('🔍 必需字段检查:');
        console.log('─'.repeat(50));
        
        let allValid = true;
        requiredFields.forEach(field => {
            if (field.value === undefined || field.value === null || field.value === '') {
                console.log(`❌ ${field.path}: 缺失或为空`);
                allValid = false;
            } else {
                console.log(`✅ ${field.path}: ${field.value}`);
            }
        });
        console.log();
        
        // 测试版权年份生成
        const startYear = new Date(config.copyright.startDate).getFullYear();
        const currentYear = new Date().getFullYear();
        const copyrightYear = config.copyright.autoRange && startYear < currentYear 
            ? `${startYear}-${currentYear}` 
            : startYear.toString();
        
        console.log('📅 版权信息测试:');
        console.log('─'.repeat(50));
        console.log(`开始年份: ${startYear}`);
        console.log(`当前年份: ${currentYear}`);
        console.log(`自动范围: ${config.copyright.autoRange}`);
        console.log(`显示结果: Copyright © ${copyrightYear}`);
        console.log();
        
        // 测试 Footer 显示
        console.log('📝 Footer 显示效果:');
        console.log('─'.repeat(50));
        console.log(`Copyright © ${copyrightYear} ${config.footer.websiteText} • Powered by Wen`);
        console.log(`链接: ${config.footer.websiteUrl} (${config.footer.websiteText})`);
        console.log(`链接: https://gw124.top/ (Wen - 固定链接)`);
        console.log();
        
        // 检查 public 目录同步
        const publicConfigPath = path.join(__dirname, '../public/config.yml');
        if (fs.existsSync(publicConfigPath)) {
            const publicConfig = yaml.load(fs.readFileSync(publicConfigPath, 'utf8'));
            const rootConfig = config;
            
            console.log('🔄 配置同步检查:');
            console.log('─'.repeat(50));
            
            // 对比两个配置
            const isDifferent = JSON.stringify(rootConfig) !== JSON.stringify(publicConfig);
            if (isDifferent) {
                console.log('⚠️  警告: 根目录和 public 目录的配置不一致！');
                console.log('请运行: npm run scan-icons');
            } else {
                console.log('✅ 根目录和 public 目录的配置一致');
            }
        } else {
            console.log('⚠️  警告: public/config.yml 不存在');
            console.log('请运行: npm run scan-icons');
        }
        console.log();
        
        // 最终结果
        if (allValid) {
            console.log('🎉 配置测试通过！所有字段都已正确配置。\n');
        } else {
            console.log('❌ 配置测试失败！请检查缺失的字段。\n');
            process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ 配置测试失败:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    testConfig();
}

module.exports = { testConfig };


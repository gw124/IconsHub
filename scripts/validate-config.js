const { configLoader } = require('./config-loader');

/**
 * 配置验证脚本
 * 验证 config.yml 文件的格式和内容
 */
function validateConfig() {
    console.log('🔍 开始验证配置文件...');
    
    try {
        const config = configLoader.getAll();
        
        // 验证必需字段
               const requiredFields = [
                   'site.title',
                   'site.description',
                   'deployment.branch',
                   'deployment.domain',
                   'copyright.startDate',
                   'footer.websiteText',
                   'footer.websiteUrl',
                   'footer.authorText',
                   'footer.authorUrl'
               ];
        
        const missingFields = [];
        
        requiredFields.forEach(field => {
            const value = configLoader.get(field);
            if (value === null || value === undefined) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            console.error('❌ 缺少必需字段:', missingFields.join(', '));
            return false;
        }
        
        // 验证数据类型
        const validations = [
            {
                field: 'site.title',
                type: 'string',
                message: '网站标题必须是字符串'
            },
            {
                field: 'deployment.domain',
                type: 'string',
                message: '部署域名必须是字符串'
            },
            {
                field: 'deployment.branch',
                type: 'string',
                message: '部署分支必须是字符串'
            },
            {
                field: 'copyright.startDate',
                type: 'string',
                message: '版权开始日期必须是字符串'
            },
            {
                field: 'footer.websiteText',
                type: 'string',
                message: '网站文本必须是字符串'
            },
            {
                field: 'footer.authorText',
                type: 'string',
                message: '作者文本必须是字符串'
            },
            {
                field: 'footer.authorUrl',
                type: 'string',
                message: '作者URL必须是字符串'
            }
        ];
        
        const invalidFields = [];
        
        validations.forEach(validation => {
            const value = configLoader.get(validation.field);
            const expectedType = validation.type === 'object' ? 'object' : 'string';
            
            if (typeof value !== expectedType) {
                invalidFields.push(validation.field);
            }
        });
        
        if (invalidFields.length > 0) {
            console.error('❌ 字段类型错误:', invalidFields.join(', '));
            return false;
        }
        
        // 验证日期格式
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const startDate = configLoader.get('copyright.startDate');
        
        if (!dateRegex.test(startDate)) {
            console.error('❌ 版权开始日期格式错误:', startDate);
            return false;
        }
        
        // 验证域名格式
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/;
        const domain = configLoader.get('deployment.domain');
        
        if (!domainRegex.test(domain)) {
            console.error('❌ 域名格式错误:', domain);
            return false;
        }
        
        console.log('✅ 配置文件验证通过');
        console.log('📊 配置摘要:');
        console.log(`  - 网站标题: ${configLoader.get('site.title')}`);
        console.log(`  - 部署分支: ${configLoader.get('deployment.branch')}`);
        console.log(`  - 域名: ${configLoader.get('deployment.domain')}`);
        console.log(`  - 版权开始日期: ${configLoader.get('copyright.startDate')}`);
        console.log(`  - 网站文本: ${configLoader.get('footer.websiteText')}`);
        console.log(`  - 作者文本: ${configLoader.get('footer.authorText')}`);
        
        return true;
        
    } catch (error) {
        console.error('❌ 配置验证失败:', error.message);
        return false;
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    const isValid = validateConfig();
    process.exit(isValid ? 0 : 1);
}

module.exports = { validateConfig };

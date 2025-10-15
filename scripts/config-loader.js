const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * 配置加载器
 * 用于加载和解析 config.yml 配置文件
 */
class ConfigLoader {
    constructor() {
        this.config = null;
        this.configPath = path.join(__dirname, '../config.yml');
        this.loadConfig();
    }

    /**
     * 加载配置文件
     */
    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const fileContents = fs.readFileSync(this.configPath, 'utf8');
                this.config = yaml.load(fileContents);
                console.log('✅ 配置文件加载成功');
            } else {
                console.warn('⚠️ 配置文件不存在，使用默认配置');
                this.config = this.getDefaultConfig();
            }
        } catch (error) {
            console.error('❌ 配置文件加载失败:', error.message);
            this.config = this.getDefaultConfig();
        }
    }

    /**
     * 获取默认配置
     */
    getDefaultConfig() {
        return {
            site: {
                title: "Icon 图标库",
                description: "提供在线图标链接，用于个人NAS设备显示使用，禁止用于商业用途",
                author: "GWen124",
                url: "https://icons.gw124.top"
            },
            deployment: {
                branch: "Web",
                domain: "icons.gw124.top",
                cname: "icons.gw124.top",
                commit_message: "🚀 Auto deploy: Update icons and rebuild"
            },
            icons: {
                formats: ["png", "jpg", "jpeg", "svg", "webp"],
                default_type: "png",
                size: 64,
                lazy_load: true
            },
            search: {
                enabled: true,
                placeholder: "搜索图标",
                category_filter: true
            },
            ui: {
                primary_color: "#6366f1",
                secondary_color: "#4f46e5",
                card_style: "modern",
                show_count: true,
                items_per_page: 50
            },
            features: {
                copy_enabled: true,
                cdn_enabled: true,
                cdn_url: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/",
                stats_enabled: true
            },
            development: {
                hot_reload: true,
                debug: false,
                port: 8080
            }
        };
    }

    /**
     * 获取配置值
     * @param {string} key - 配置键，支持点号分隔的嵌套键
     * @param {any} defaultValue - 默认值
     */
    get(key, defaultValue = null) {
        const keys = key.split('.');
        let value = this.config;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }
        
        return value;
    }

    /**
     * 获取所有配置
     */
    getAll() {
        return this.config;
    }

    /**
     * 重新加载配置
     */
    reload() {
        this.loadConfig();
    }
}

// 创建全局配置实例
const configLoader = new ConfigLoader();

module.exports = { ConfigLoader, configLoader };

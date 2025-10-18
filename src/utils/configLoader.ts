/**
 * 配置加载器
 * 用于加载和解析 config.yml 配置文件
 */

export interface SiteConfig {
  title: string;
  description: string;
}

export interface DeploymentConfig {
  branch: string;
  domain: string;
}

export interface CopyrightConfig {
  startDate: string;
  autoRange: boolean;
}

export interface FooterConfig {
  websiteText: string;
  websiteUrl: string;
  // 注意：authorText 和 authorUrl 已从配置中移除，固定在代码中
}

export interface AppConfig {
  site: SiteConfig;
  deployment: DeploymentConfig;
  copyright: CopyrightConfig;
  footer: FooterConfig;
}

/**
 * 加载配置文件
 * 从 public/config.yml 加载配置
 */
export async function loadConfig(): Promise<AppConfig> {
  try {
    // 添加时间戳防止缓存
    const timestamp = new Date().getTime();
    const response = await fetch(process.env.BASE_URL + `config.yml?t=${timestamp}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    
    console.log('📄 原始配置文件内容:', text);
    
    // 简单的YAML解析（仅支持基本结构）
    const config = parseSimpleYaml(text);
    
    console.log('🔧 解析后的配置:', config);
    
    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    // 返回默认配置
    return getDefaultConfig();
  }
}

/**
 * 简单的YAML解析器
 * 仅支持基本的键值对结构
 */
function parseSimpleYaml(yamlText: string): AppConfig {
  const lines = yamlText.split('\n');
  const config: any = {};
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // 跳过空行和注释
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }
    
    // 检查是否是节标题
    if (trimmedLine.endsWith(':')) {
      currentSection = trimmedLine.slice(0, -1);
      config[currentSection] = {};
      continue;
    }
    
    // 解析键值对
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmedLine.slice(0, colonIndex).trim();
      let value = trimmedLine.slice(colonIndex + 1).trim();
      
      // 移除引号
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (currentSection) {
        config[currentSection][key] = value;
      } else {
        config[key] = value;
      }
    }
  }
  
  return config as AppConfig;
}

/**
 * 获取默认配置
 */
function getDefaultConfig(): AppConfig {
  return {
    site: {
      title: "IconsHub",
      description: "提供在线图标链接，用于个人NAS设备显示使用，禁止用于商业用途"
    },
    deployment: {
      branch: "Web",
      domain: "icons.gw124.top"
    },
    copyright: {
      startDate: "2025-01-01",
      autoRange: true
    },
    footer: {
      websiteText: "ICONS.GW124.TOP",
      websiteUrl: "https://icons.gw124.top"
    }
  };
}

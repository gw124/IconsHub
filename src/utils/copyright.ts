/**
 * 版权年份计算工具
 * 根据配置自动计算版权年份范围
 */

export interface CopyrightConfig {
  startDate: string; // 格式：YYYY-MM-DD
  autoRange: boolean; // 是否自动计算年份范围
}

/**
 * 格式化版权年份
 * @param copyrightConfig 版权配置
 * @returns 格式化后的版权年份字符串
 */
export function formatCopyrightYear(copyrightConfig: CopyrightConfig): string {
  if (!copyrightConfig.autoRange) {
    // 如果禁用自动范围，只显示开始年份
    return copyrightConfig.startDate.split('-')[0];
  }

  try {
    const startDate = new Date(copyrightConfig.startDate);
    const currentDate = new Date();
    const startYear = startDate.getFullYear();
    const currentYear = currentDate.getFullYear();

    // 计算年份差
    const yearDiff = currentYear - startYear;

    if (yearDiff <= 0) {
      // 当前年份小于等于开始年份，只显示开始年份
      return startYear.toString();
    } else if (yearDiff >= 1) {
      // 超过一年，显示年份范围
      return `${startYear}-${currentYear}`;
    } else {
      // 不到一年，只显示开始年份
      return startYear.toString();
    }
  } catch (error) {
    console.error('版权年份格式化错误:', error);
    // 出错时返回开始年份
    return copyrightConfig.startDate.split('-')[0];
  }
}

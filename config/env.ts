// 环境类型
type Environment = 'development' | 'production'

// 获取当前环境
const getEnvironment = (): Environment => {
  // 在浏览器扩展中，可以通过其他方式判断环境
  // 这里简化处理，可以根据需要调整
  return 'production'
}

// 不同环境的配置
const configs = {
  development: {},
  production: {},
} as const

// 当前环境
const currentEnv = getEnvironment()

// 导出当前环境的配置
export const ENV_CONFIG = configs[currentEnv]

// 导出环境类型
export type { Environment }

// 插件启用状态和排序的缓存key
const PLUGIN_SETTINGS_KEY = 'linux-do-plugin-settings'
// 插件参数配置的缓存key
const PLUGIN_PARAMS_KEY = 'linux-do-plugin-params'

// 插件配置项类型
export interface PluginConfigItem {
  name: string
  description: string
  type: 'input' | 'select' | 'select-tags'
  options?: string[]
}

// 插件设置项类型
export interface PluginSetting {
  id: string
  enabled: boolean
}

// 获取插件设置
export const getPluginSettings = (): PluginSetting[] => {
  try {
    const settings = localStorage.getItem(PLUGIN_SETTINGS_KEY)
    return settings ? JSON.parse(settings) : []
  } catch (error) {
    console.log(666, '获取插件设置失败:', error)
    return []
  }
}

// 保存插件设置
export const savePluginSettings = (settings: PluginSetting[]): void => {
  try {
    localStorage.setItem(PLUGIN_SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.log(666, '保存插件设置失败:', error)
  }
}

// 获取插件参数配置
export const getPluginParams = (pluginId: string): Record<string, any> => {
  try {
    const allParams = localStorage.getItem(PLUGIN_PARAMS_KEY)
    const params = allParams ? JSON.parse(allParams) : {}
    return params[pluginId] || {}
  } catch (error) {
    console.log(666, '获取插件参数失败:', error)
    return {}
  }
}

// 保存插件参数配置
export const savePluginParams = (pluginId: string, params: Record<string, any>): void => {
  try {
    const allParams = localStorage.getItem(PLUGIN_PARAMS_KEY)
    const currentParams = allParams ? JSON.parse(allParams) : {}
    currentParams[pluginId] = params
    localStorage.setItem(PLUGIN_PARAMS_KEY, JSON.stringify(currentParams))
  } catch (error) {
    console.log(666, '保存插件参数失败:', error)
  }
}

// 插件启用状态和排序的缓存key
const PLUGIN_SETTINGS_KEY = 'linux-do-plugin-settings'

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

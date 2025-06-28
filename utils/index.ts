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
    const result = params[pluginId] || {}
    
    // 调试日志：显示参数获取过程
    console.log('📥 获取插件参数:', {
      插件ID: pluginId,
      缓存中的所有参数: params,
      该插件的参数: result,
    })
    
    return result
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
    
    // 调试日志：显示参数保存过程
    console.log('💾 保存插件参数:', {
      插件ID: pluginId,
      保存的参数: params,
      保存后的全部参数: currentParams,
    })
  } catch (error) {
    console.log(666, '保存插件参数失败:', error)
  }
}

// 执行单个插件
export const executePlugin = async (plugin: any, pluginId: string): Promise<void> => {
  console.group(`🔌 插件执行: ${plugin.info.name}`)
  
  try {
    // 获取用户配置的参数（每次执行都重新获取最新的）
    const userParams = getPluginParams(pluginId)
    // 合并初始值和用户配置
    const finalParams = { ...plugin.params?.initValues, ...userParams }
    
    console.log('🔄 参数获取详情:', {
      初始值: plugin.params?.initValues,
      用户配置: userParams,
      最终参数: finalParams,
    })

    console.log('📋 插件信息:', {
      名称: plugin.info.name,
      描述: plugin.info.description,
      作者: plugin.info.author.name,
      ID: pluginId,
    })

    console.log('⚙️ 执行参数:', finalParams)

    const startTime = Date.now()

    // 调用插件的trigger函数
    if (typeof plugin.trigger === 'function') {
      await plugin.trigger(finalParams)
      const endTime = Date.now()
      console.log(`✅ 执行成功，耗时: ${endTime - startTime}ms`)
    } else {
      console.warn('⚠️ 插件没有trigger函数')
    }
  } catch (error) {
    console.error('❌ 插件执行失败:', error)
  } finally {
    console.groupEnd()
  }
}

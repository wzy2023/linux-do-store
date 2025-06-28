import { useState, useEffect, useCallback } from 'react'

import { getPluginSettings, savePluginSettings, type PluginSetting, type PluginConfigItem, executePlugin } from '@/utils'
import plugins from '../plugins'

// 插件信息类型
export interface PluginInfo {
  id: string
  name: string
  description: string
  enabled: boolean
  author: {
    name: string
    id: string
  }
  params?: {
    config: PluginConfigItem[]
    initValues: Record<string, any>
  }
}

// 使用插件表格数据的hook
export const usePluginTable = () => {
  const [pluginList, setPluginList] = useState<PluginInfo[]>([])

  // 初始化插件数据
  const initializePlugins = useCallback(() => {
    const savedSettings = getPluginSettings()

    const initialPlugins: PluginInfo[] = plugins.map((plugin, index) => {
      const pluginId = plugin.info.author.id + '_' + index // 生成唯一ID
      const savedSetting = savedSettings.find(setting => setting.id === pluginId)

      return {
        id: pluginId,
        name: plugin.info.name,
        description: plugin.info.description,
        author: plugin.info.author,
        enabled: savedSetting?.enabled ?? true, // 默认启用
        params: plugin.params,
      }
    })

    // 根据保存的顺序排序
    const sortedPlugins = [...initialPlugins]
    savedSettings.forEach((setting, index) => {
      const pluginIndex = sortedPlugins.findIndex(p => p.id === setting.id)
      if (pluginIndex !== -1) {
        const [plugin] = sortedPlugins.splice(pluginIndex, 1)
        sortedPlugins.splice(index, 0, plugin)
      }
    })

    setPluginList(sortedPlugins)
  }, [])

  // 更新插件启用状态
  const updatePluginEnabled = useCallback((id: string, enabled: boolean) => {
    setPluginList(prev => {
      const updated = prev.map(plugin =>
        plugin.id === id ? { ...plugin, enabled } : plugin,
      )

      // 保存到缓存
      const settings: PluginSetting[] = updated.map(plugin => ({
        id: plugin.id,
        enabled: plugin.enabled,
      }))
      savePluginSettings(settings)

      return updated
    })
  }, [])

  // 更新插件排序
  const updatePluginOrder = useCallback((newOrder: PluginInfo[]) => {
    setPluginList(newOrder)

    // 保存到缓存
    const settings: PluginSetting[] = newOrder.map(plugin => ({
      id: plugin.id,
      enabled: plugin.enabled,
    }))
    savePluginSettings(settings)
  }, [])

  useEffect(() => {
    initializePlugins()
  }, [initializePlugins])

  // 执行所有启用的插件
  const executeAllEnabledPlugins = useCallback(async (reason = '用户操作') => {
    const enabledPlugins = pluginList.filter(p => p.enabled)
    
    if (enabledPlugins.length === 0) {
      console.log('📦 没有启用的插件需要执行')
      return
    }
    
    console.group(`⚙️ 配置变更 - 重新执行插件 (${enabledPlugins.length}个启用)`)
    console.log('📊 执行概览:', {
      总插件数: pluginList.length,
      启用插件数: enabledPlugins.length,
      执行时间: new Date().toLocaleTimeString(),
      触发原因: reason,
    })
    
    const startTime = Date.now()
    
    for (const pluginInfo of enabledPlugins) {
      // 找到对应的原始插件对象
      const originalPlugin = plugins.find((_, index) => {
        const pluginId = plugins[index]?.info?.author?.id + '_' + index
        return pluginId === pluginInfo.id
      })
      
      if (originalPlugin) {
        await executePlugin(originalPlugin, pluginInfo.id)
      }
    }
    
    const endTime = Date.now()
    console.log(`🎉 所有插件执行完成，总耗时: ${endTime - startTime}ms`)
    console.groupEnd()
  }, [pluginList])

  return {
    pluginList,
    updatePluginEnabled,
    updatePluginOrder,
    executeAllEnabledPlugins,
  }
}

export { useGlobalPluginExecutor } from './useGlobalPluginExecutor'

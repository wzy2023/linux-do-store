import { useState, useEffect, useCallback } from 'react'

import { getPluginSettings, savePluginSettings, type PluginSetting } from '@/utils'
import plugins from '../plugins'

// 插件信息类型
export interface PluginInfo {
  id: string
  name: string
  description: string
  enabled: boolean
  params?: any
  author: {
    name: string
    id: string
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

  return {
    pluginList,
    updatePluginEnabled,
    updatePluginOrder,
  }
}

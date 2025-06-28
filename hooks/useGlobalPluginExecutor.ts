import { useEffect } from 'react'

import { getPluginSettings, executePlugin } from '@/utils'
import plugins from '../plugins'

// 全局插件执行器，在页面加载时自动执行启用的插件
export const useGlobalPluginExecutor = () => {
  useEffect(() => {
    const executeEnabledPlugins = async () => {
      const settings = getPluginSettings()
      const enabledSettings = settings.filter(setting => setting.enabled)

      if (enabledSettings.length === 0) {
        console.log('📦 没有启用的插件需要执行')
        return
      }

      console.group(`🌍 页面加载 - 自动执行插件 (${enabledSettings.length}个启用)`)
      console.log('📊 执行概览:', {
        执行时间: new Date().toLocaleTimeString(),
        启用插件数: enabledSettings.length,
        触发原因: '页面加载完成',
      })

      const startTime = Date.now()

      // 按照设置的顺序执行插件
      for (const setting of enabledSettings) {
        // 根据pluginId找到对应的插件
        const pluginIndex = plugins.findIndex((_, index) => {
          const pluginId = plugins[index]?.info?.author?.id + '_' + index
          return pluginId === setting.id
        })

        if (pluginIndex !== -1) {
          const plugin = plugins[pluginIndex]
          await executePlugin(plugin, setting.id)
        }
      }

      const endTime = Date.now()
      console.log(`🎉 页面加载插件执行完成，总耗时: ${endTime - startTime}ms`)
      console.groupEnd()
    }

    // 延迟执行，确保页面完全加载
    const timer = setTimeout(() => {
      executeEnabledPlugins()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
}

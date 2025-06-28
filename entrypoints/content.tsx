import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '../components/App'

// 检查扩展上下文是否有效
const isExtensionContextValid = (): boolean => {
  try {
    return !!(browser?.runtime?.id)
  } catch (error) {
    return false
  }
}

// 全局变量跟踪DOM元素
let containerElement: HTMLDivElement | null = null
let rootInstance: ReturnType<typeof createRoot> | null = null

// 移除所有插入的DOM元素
const removeAllElements = () => {
  if (rootInstance) {
    try {
      rootInstance.unmount()
    } catch (e) {
      console.error('卸载组件时出错:', e)
    }
    rootInstance = null
  }

  if (containerElement && containerElement.parentNode) {
    containerElement.parentNode.removeChild(containerElement)
    containerElement = null
  }
}

// 初始化存储并执行内容脚本的主逻辑
const initializeAndRun = async () => {
  // 检查扩展上下文是否有效
  if (!isExtensionContextValid()) {
    console.log('扩展上下文无效，跳过初始化')
    return
  }

  // 获取当前页面URL
  const currentUrl = window.location.href

  try {
    console.log('创建右下角按钮')

    // 如果已经存在，先移除
    if (containerElement) {
      removeAllElements()
    }

    // 创建一个容器元素
    containerElement = document.createElement('div')
    containerElement.id = 'web-content-drawer-root'
    document.body.appendChild(containerElement)

    // 渲染React组件
    rootInstance = createRoot(containerElement)
    const appInstance = <App />
    rootInstance.render(appInstance)

    // 监听来自popup的消息（需要检查上下文有效性）
    if (isExtensionContextValid()) {
      try {
        browser.runtime.onMessage.addListener((message) => {
          if (message.action === 'showDrawer') {
            // 通过全局事件触发抽屉显示
            const event = new CustomEvent('showContentDrawer')
            window.dispatchEvent(event)
          }
        })
      } catch (error) {
        console.error('添加消息监听器失败:', error)
      }
    }
  } catch (error) {
    console.error('初始化内容脚本时出错:', error)
  }
}

export default defineContentScript({
  matches: ['<all_urls>'], // 匹配所有网址
  main() {
    // 检查扩展上下文是否有效再初始化
    if (isExtensionContextValid()) {
      setTimeout(initializeAndRun, 100)
    } else {
      console.log('扩展上下文无效，跳过content script初始化')
    }
  },
})

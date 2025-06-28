import React, { useState } from 'react'

import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import { ContentDrawer } from './ContentDrawer'
import { FloatingButton } from './FloatingButton'

const isExtensionContextValid = (): boolean => {
  try {
    return !!(browser?.runtime?.id)
  } catch (error) {
    return false
  }
}

export default () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = async () => {
    if (!isExtensionContextValid()) {
      message.error('扩展上下文无效，请刷新页面重试')
      return
    }
    setVisible(true)
  }

  const closeDrawer = () => {
    setVisible(false)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <FloatingButton
        onClick={showDrawer}
        visible={!visible}
      />

      <ContentDrawer
        visible={visible}
        onClose={closeDrawer}
      />
    </ConfigProvider>
  )
}

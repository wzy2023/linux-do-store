import React from 'react'

import { Drawer } from 'antd'

interface ContentDrawerProps {
  visible: boolean
  onClose: () => void
}

export const ContentDrawer = (props: ContentDrawerProps) => {
  const { visible, onClose } = props

  return (
    <Drawer
      title='Linux Do Store'
      width='50%'
      placement='right'
      destroyOnClose
      open={visible}
      onClose={onClose}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
        暂无内容
      </div>
    </Drawer>
  )
}

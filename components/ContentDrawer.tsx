import React from 'react'

import { Drawer } from 'antd'

import { PluginTable } from './PluginTable'

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
      styles={{ body: { padding: 16 } }}
    >
      <PluginTable />
    </Drawer>
  )
}

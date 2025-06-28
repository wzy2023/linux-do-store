import React from 'react'
import { FloatButton } from 'antd'
import { ReadOutlined } from '@ant-design/icons'

interface FloatingButtonProps {
  loading?: boolean
  onClick: () => void
  visible?: boolean
}

export const FloatingButton = (props: FloatingButtonProps) => {
  const { loading = false, visible = true, onClick } = props

  // 如果不可见，直接返回null
  if (!visible) {
    return null
  }

  return (
    <>
      <FloatButton
        icon={<ReadOutlined />}
        type='primary'
        tooltip='打开设置'
        onClick={onClick}
        style={{
          right: 24,
          bottom: 24,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      />
    </>
  )
}

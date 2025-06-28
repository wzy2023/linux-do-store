import React, { useState, useEffect } from 'react'

import { Input, Select, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { getPluginParams, savePluginParams, type PluginConfigItem } from '@/utils'

interface PluginParamsConfigProps {
  pluginId: string
  config: PluginConfigItem[]
  initValues: Record<string, any>
  onParamsChange?: () => void
}

interface ParamRow {
  key: string
  name: string
  description: string
  value: any
  type: 'input' | 'select' | 'select-tags'
  options?: string[]
}

export const PluginParamsConfig = (props: PluginParamsConfigProps) => {
  const { pluginId, config, initValues, onParamsChange } = props
  const [paramValues, setParamValues] = useState<Record<string, any>>({})

  // 初始化参数值
  useEffect(() => {
    const savedParams = getPluginParams(pluginId)
    const mergedValues = { ...initValues, ...savedParams }
    setParamValues(mergedValues)
  }, [pluginId, initValues])

  // 更新参数值
  const onValueChange = (name: string, value: any) => {
    const newValues = { ...paramValues, [name]: value }
    setParamValues(newValues)
    savePluginParams(pluginId, newValues)
    
    // 参数修改后触发回调
    onParamsChange?.()
  }

  // 渲染值编辑组件
  const renderValueEditor = (record: ParamRow) => {
    const { name, type, options } = record
    const value = paramValues[name]

    switch (type) {
      case 'input':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onValueChange(name, e.target.value)}
            placeholder='请输入值'
            size='small'
          />
        )

      case 'select':
        return (
          <Select
            value={value}
            onChange={(val) => onValueChange(name, val)}
            options={options?.map(opt => ({ label: opt, value: opt }))}
            placeholder='请选择'
            size='small'
            style={{ width: '100%' }}
          />
        )

      case 'select-tags':
        return (
          <Select
            mode='tags'
            value={value || []}
            onChange={(val) => onValueChange(name, val)}
            placeholder='请输入标签'
            size='small'
            style={{ width: '100%' }}
          />
        )

      default:
        return null
    }
  }

  // 表格列配置
  const columns: ColumnsType<ParamRow> = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 150,
    },
    {
      title: '值',
      dataIndex: 'value',
      render: (_, record) => renderValueEditor(record),
    },
  ]

  // 转换配置为表格数据
  const dataSource: ParamRow[] = config.map(item => ({
    key: item.name,
    name: item.name,
    description: item.description,
    value: paramValues[item.name],
    type: item.type,
    options: item.options,
  }))

  if (config.length === 0) {
    return (
      <div style={{ padding: '16px', color: '#666', textAlign: 'center' }}>
        该插件暂无可配置参数
      </div>
    )
  }

  return (
    <div style={{ padding: 0 }}>
      <div style={{ marginBottom: 12, fontWeight: 500 }}>参数配置</div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size='small'
        bordered
      />
    </div>
  )
}

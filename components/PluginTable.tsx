import React from 'react'

import { Switch, Tag } from 'antd'
import { DragSortTable } from '@ant-design/pro-components'
import type { ProColumns } from '@ant-design/pro-components'

import { PluginParamsConfig } from './PluginParamsConfig'

import { usePluginTable, type PluginInfo } from '@/hooks'

export const PluginTable = () => {
  const { pluginList, updatePluginEnabled, updatePluginOrder } = usePluginTable()

  // 处理作者标签点击
  const onAuthorClick = (authorId: string) => {
    const url = `https://linux.do/u/${authorId}/summary`
    window.open(url, '_blank')
  }

  // 处理启用状态切换
  const onEnabledChange = (checked: boolean, record: PluginInfo) => {
    updatePluginEnabled(record.id, checked)
  }

  // 处理拖拽排序
  const onDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: PluginInfo[]) => {
    updatePluginOrder(newDataSource)
  }

  const columns: ProColumns<PluginInfo>[] = [
    {
      title: '是否启用',
      dataIndex: 'enabled',
      width: 100,
      render: (_, record: PluginInfo) => (
        <Switch
          checked={record.enabled}
          onChange={(checked) => onEnabledChange(checked, record)}
          size='small'
        />
      ),
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '介绍',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 120,
      render: (_, record: PluginInfo) => (
        <Tag
          color='blue'
          style={{ cursor: 'pointer' }}
          onClick={() => onAuthorClick(record.author.id)}
        >
          {record.author.name}
        </Tag>
      ),
    },
  ]

  return (
    <DragSortTable<PluginInfo>
      columns={columns}
      rowKey='id'
      dataSource={pluginList}
      dragSortKey='sort'
      onDragSortEnd={onDragSortEnd}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ backgroundColor: '#fafafa' }}>
            <PluginParamsConfig
              pluginId={record.id}
              config={record.params?.config || []}
              initValues={record.params?.initValues || {}}
            />
          </div>
        ),
        rowExpandable: (record) => {
          return !!(record.params?.config && record.params.config.length > 0)
        },
      }}
      pagination={false}
      search={false}
      options={false}
      size='small'
    />
  )
}

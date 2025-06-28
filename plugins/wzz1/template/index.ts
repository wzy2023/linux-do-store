export default {
  info: {
    name: '用于插件模板',
    description: '用于插件模板',
    author: { name: '单身汪', id: 'wzz1' },
  },
  params: {
    config: [
      {
        name: 'tags',
        description: '标签配置',
        type: 'select-tags' as const,
      },
    ],
    initValues: {
      tags: ['默认标签'],
    },
  },
  trigger: async (params: any) => {
    console.log(666, 4, 111, params)
  },
}

export default {
  info: {
    name: '用于插件模板',
    description: '用于插件模板',
    author: { name: '单身汪', id: 'wzz1' },
  },
  params: {
    config: [],
    initValues: {},
  },
  trigger: async (params: any) => {
    console.log(666, 4, 111, params)
  },
}

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
    console.log('🎯 模板插件开始执行')

    // 模拟一些实际的插件功能
    if (params.tags && params.tags.length > 0) {
      console.log('🏷️ 处理标签:', params.tags)

      // 模拟对每个标签的处理
      for (const tag of params.tags) {
        console.log(`  📌 处理标签: ${tag}`)
      }
    }

    // 模拟DOM操作
    console.log('🔧 模拟DOM操作...')
    const elements = document.querySelectorAll('body')
    console.log(`  📄 找到 ${elements.length} 个body元素`)

    // 模拟异步操作
    console.log('⏳ 执行异步任务...')
    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('✨ 模板插件执行完成')
  },
}

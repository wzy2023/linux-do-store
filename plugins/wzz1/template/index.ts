export default {
  info: {
    name: '金光头像',
    description: '为头像添加类似[富可敌国]才有的样式，支持选择作用范围（自己/所有人）',
    author: { name: '单身汪', id: 'wzz1' },
  },
  params: {
    config: [
      {
        name: 'scope',
        description: '作用范围',
        type: 'select' as const,
        options: ['自己', '所有人'],
      },
    ],
    initValues: {
      scope: '所有人',
    },
  },
  trigger: async (params: any) => {
    console.group('🎯 模板插件内部执行流程')

    try {
      console.log('📥 接收到参数:', params)

            // 参数验证和处理
      console.group('📋 参数验证')
      console.log('接收到的所有参数:', params)
      console.log('作用范围参数:', params.scope)
      console.groupEnd()

      // DOM操作：为话题帖子添加商家群组样式
      console.group('🔧 DOM操作模块 - 添加商家群组样式')

      const scope = params.scope || '所有人'
      console.log(`🎯 作用范围: ${scope}`)

      // 根据作用范围确定选择器
      let selector = '.topic-post'
      if (scope === '自己') {
        selector = '.topic-post.current-user-post'
        console.log('🔍 查找自己的帖子: .topic-post.current-user-post')
      } else {
        console.log('🔍 查找所有帖子: .topic-post')
      }

      const topicPosts = document.querySelectorAll(selector)
      console.log(`📄 找到 ${topicPosts.length} 个符合条件的元素`)

      if (topicPosts.length > 0) {
        console.log('开始为元素添加 group-g-merchant 类名...')

        topicPosts.forEach((item, index) => {
          const beforeClasses = item.className
          item.classList.add('group-g-merchant')
          const afterClasses = item.className

          console.log(`  📌 元素 ${index + 1}:`)
          console.log(`    修改前: ${beforeClasses}`)
          console.log(`    修改后: ${afterClasses}`)
        })

        console.log(`✅ 成功为 ${topicPosts.length} 个元素添加了 group-g-merchant 类名`)
      } else {
        if (scope === '自己') {
          console.log('⚠️ 未找到自己的帖子 (.topic-post.current-user-post)，可能当前页面没有你的帖子或页面还未完全加载')
        } else {
          console.log('⚠️ 未找到 .topic-post 元素，可能页面还未完全加载或不在相关页面')
        }
      }

      console.groupEnd()

      // 模拟异步操作
      console.group('⏳ 异步任务模块')
      console.log('开始执行异步任务...')
      await new Promise(resolve => setTimeout(resolve, 150))
      console.log('异步任务完成')
      console.groupEnd()

      console.log('✨ 模板插件内部逻辑执行完成')

    } catch (error) {
      console.error('❌ 插件内部执行出错:', error)
      throw error
    } finally {
      console.groupEnd()
    }
  },
}

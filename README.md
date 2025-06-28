# Linux Do Store

一个基于 WXT 框架开发的浏览器扩展，为 Linux Do 社区提供插件化的功能增强。

## 📖 项目介绍

Linux Do Store 是一个可扩展的浏览器插件系统，允许用户通过安装和配置各种插件来增强 Linux Do 网站的功能。

插件系统支持拖拽排序、参数配置、启用/禁用等功能，为用户提供个性化的浏览体验。

## ✨ 功能特性

### 🎛️ 插件管理
- **可视化管理界面**：通过右下角浮动按钮打开插件管理抽屉
- **拖拽排序**：支持拖拽调整插件执行顺序
- **启用/禁用**：一键切换插件状态
- **参数配置**：支持插件参数的可视化配置

### 🔧 插件系统
- **自动执行**：页面加载时自动执行启用的插件
- **实时更新**：配置修改后自动重新执行相关插件
- **详细日志**：使用 `console.group` 组织的结构化执行日志
- **错误处理**：完善的错误捕获和处理机制

### 📊 用户参数配置
支持三种参数类型：
- **Input**：文本输入框
- **Select**：下拉选择框（选项由插件作者提供）
- **Select-tags**：标签选择框（用户可自由输入）

### 💾 数据持久化
- **配置缓存**：插件启用状态和排序保存到 localStorage
- **参数缓存**：用户配置的参数值自动保存
- **初始值支持**：插件可提供默认参数值

## 🚀 快速开始

### 安装依赖
```bash
bun install
```

### 开发模式
```bash
bun run dev
```

### 构建扩展
```bash
bun run build
```

## 🔌 插件开发指南

### 插件结构

每个插件都是一个独立的模块，需要导出一个包含以下结构的对象：

```typescript
export default {
  info: {
    name: '插件名称',
    description: '插件描述',
    author: { name: '作者名称', id: '作者ID' }, // 作者ID需要是 LinuxDo 的用户id
  },
  params: { // 可选，如果需要用户传入配置的话再写
    config: [
      // 参数配置项
    ],
    initValues: {
      // 默认参数值
    },
  },
  trigger: async (params: any) => {
    // 插件执行逻辑
  },
}
```

### 参数配置

#### Input 类型
```typescript
{
  name: 'apiKey',
  description: 'API密钥',
  type: 'input' as const,
}
```

#### Select 类型
```typescript
{
  name: 'theme',
  description: '主题选择',
  type: 'select' as const,
  options: ['light', 'dark', 'auto'],
}
```

#### Select-tags 类型
```typescript
{
  name: 'tags',
  description: '标签配置',
  type: 'select-tags' as const,
}
```

### 插件示例

以下是一个完整的插件示例：

```typescript
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
    console.group('🎯 插件内部执行流程')
    
    try {
      console.log('📥 接收到参数:', params)
      
      // 参数验证和处理
      console.group('📋 参数验证')
      console.log('接收到的所有参数:', params)
      console.log('作用范围参数:', params.scope)
      console.groupEnd()
      
      // DOM操作
      console.group('🔧 DOM操作模块')
      const scope = params.scope || '所有人'
      
      let selector = '.topic-post'
      if (scope === '自己') {
        selector = '.topic-post.current-user-post'
      }
      
      const elements = document.querySelectorAll(selector)
      elements.forEach((item, index) => {
        item.classList.add('group-g-merchant')
        console.log(`📌 处理元素 ${index + 1}`)
      })
      
      console.log(`✅ 成功处理 ${elements.length} 个元素`)
      console.groupEnd()
      
      console.log('✨ 插件执行完成')
      
    } catch (error) {
      console.error('❌ 插件执行出错:', error)
      throw error
    } finally {
      console.groupEnd()
    }
  },
}
```

### 插件注册

在 `plugins/index.ts` 中注册你的插件：

```typescript
import yourPlugin from './path/to/your-plugin'

export default [
  yourPlugin,
  // 其他插件...
]
```

### 目录结构

推荐的插件目录结构：

```
plugins/
├── index.ts                 # 插件注册文件
└── your-author/
    └── your-plugin/
        └── index.ts         # 插件主文件
```

## 🛠️ 技术栈

- **框架**：WXT (Web Extension Tools)
- **前端**：React 19 + TypeScript
- **UI库**：Ant Design + Ant Design Pro Components
- **构建工具**：Bun
- **样式**：CSS-in-JS

## 📁 项目结构

```
linux-do/
├── components/              # React 组件
│   ├── App.tsx             # 主应用组件
│   ├── ContentDrawer.tsx   # 插件管理抽屉
│   ├── FloatingButton.tsx  # 浮动按钮
│   ├── PluginTable.tsx     # 插件表格
│   └── PluginParamsConfig.tsx # 参数配置组件
├── hooks/                  # 自定义 Hooks
│   ├── index.ts           # 插件表格数据管理
│   └── useGlobalPluginExecutor.ts # 全局插件执行器
├── utils/                  # 工具函数
│   └── index.ts           # 缓存和插件执行相关工具
├── plugins/               # 插件目录
│   ├── index.ts          # 插件注册
│   └── wzz1/             # 示例插件
├── config/               # 配置文件
├── entrypoints/          # WXT 入口点
└── public/              # 静态资源
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🔗 相关链接

- [Linux Do 社区](https://linux.do)
- [WXT 框架文档](https://wxt.dev)
- [Ant Design 文档](https://ant.design)

## 📞 支持

如果你在使用过程中遇到问题，可以：

1. 查看控制台日志获取详细信息
2. 在 GitHub Issues 中提交问题
3. 在 Linux Do 社区中寻求帮助

---

**享受你的插件开发之旅！** 🎉 

import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'linux-do-store',
    description: 'linux-do-store',
    permissions: ['activeTab', 'storage'],
    host_permissions: ['http://localhost:3000/*', 'https://linux.do/*'],
    action: {
      default_title: 'linux-do-store',
    },
  },
  webExt: {
    disabled: true,
  },
  dev: {
    server: {
      port: 3000,
    },
  },
})

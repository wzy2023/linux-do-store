module.exports = {
  parser: '@typescript-eslint/parser',
  // plugins: ['perfectionist'],
  parserOptions: {
    // sourceType: 'module',
  },
  rules: {
    // 'perfectionist/sort-imports': [
    //   'error',
    //   {
    //     type: 'line-length',
    //     environment: 'bun',
    //     maxLineLength: 120,
    //     sortSideEffects: true,
    //     groups: [
    //       ['serverOnly'],
    //
    //       ['react'],
    //       { newlinesBetween: 'never' },
    //       ['next'],
    //       { newlinesBetween: 'never' },
    //       ['umi'],
    //
    //       ['antd'],
    //       { newlinesBetween: 'ignore' },
    //       ['component'],
    //       { newlinesBetween: 'ignore' },
    //       ['components'],
    //       { newlinesBetween: 'ignore' },
    //       ['com'],
    //
    //       ['other'],
    //       { newlinesBetween: 'ignore' },
    //       ['hooks'],
    //       { newlinesBetween: 'ignore' },
    //       ['utils'],
    //       { newlinesBetween: 'ignore' },
    //       ['api'],
    //       { newlinesBetween: 'ignore' },
    //       ['trpc'],
    //
    //       ['css', 'font'],
    //       { newlinesBetween: 'ignore' },
    //       ['asset'],
    //     ],
    //     customGroups: {
    //       value: {
    //         serverOnly: ['server-only'],
    //         react: ['^react$', '^react-dom$'],
    //         umi: ['^@umijs/max$'],
    //         next: ['^next$', '^next/'],
    //         antd: ['^antd$', '^@ant-design/*', '@wzyjs/antd'],
    //         component: ['react-beautiful-dnd'],
    //         components: ['@/components', './components/'],
    //         com: ['^.+/+[A-Z][a-z]+'],
    //         trpc: ['^@trpc/', '@/trpc', './trpc'],
    //         api: ['^@/api', '@prisma/client'],
    //         hooks: ['^@/hooks', './hooks'],
    //         utils: ['^@/utils', './utils'],
    //         other: ['zustand', 'superjson', 'lodash', 'dayjs', 'zod'],
    //         css: ['.css$'],
    //         asset: ['^@/asset/.*$'],
    //         font: ['/font/'],
    //       },
    //     },
    //   },
    // ],
  },
};

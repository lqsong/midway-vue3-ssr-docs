import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  srcDir: 'src',
  title: 'Midway-Vue3-SSR',
  titleTemplate: '基于 Midway、Vue 3 组装的 SSR 框架',
  description: '基于 Midway、Vue 3 组装的 SSR 框架，简单、易学易用、方便扩展且结合Midway框架，您一直想要的Vue SSR 框架。',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
  ],
  markdown: {
    theme: 'material-palenight',
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '捐赠', link: '/donate/', activeMatch: '/donate/' },
      {
        text: '生态',
        items: [
          {
            text: '后台框架',
            items: [
              {text: 'admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc'},
              {text: 'admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc'},
              {text: 'admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc'},
              {text: 'electron-admin-element-vue', link: 'http://admin-element-vue.liqingsong.cc/tsv2/guide/senior/electron.html'},
              {text: 'electron-admin-antd-vue', link: 'http://admin-antd-vue.liqingsong.cc/webpackts/guide/senior/electron.html'},
              {text: 'electron-admin-antd-react', link: 'http://admin-antd-react.liqingsong.cc/guide/senior/electron.html'},
              {text: 'admin-vue3-micro-qiankun', link: 'http://admin-vue3-micro-qiankun.liqingsong.cc'},
            ],
          },
          {
            text: '前台框架',
            items: [
              {
                text: 'midway-vue3-ssr',
                link: 'http://midway-vue3-ssr.liqingsong.cc'
              }
            ],
          },
          
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsible: true,
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ]
        },
        {
          text: '基础',
          collapsible: true,
          items: [
            { text: 'Midway', link: '/guide/essentials/midway' },
            { text: 'Vue', link: '/guide/essentials/vue' },
            { text: '配置', link: '/guide/essentials/config' },
            { text: '路由', link: '/guide/essentials/routing' },
            { text: '视图', link: '/guide/essentials/views' },
            { text: 'Store(Pinia)', link: '/guide/essentials/store' },
            { text: 'asyncData 方法', link: '/guide/essentials/async-data' },
            { text: '资源文件', link: '/guide/essentials/assets' },
            { text: '构建与发布', link: '/guide/essentials/build-and-release' },
          ]
        },
        {
          text: '进阶',
          collapsible: true,
          items: [
            { text: 'tsconfig 配置', link: '/guide/senior/tsconfig' },
            { text: 'Volar', link: '/guide/senior/volar' },
            { text: '错误处理', link: '/guide/senior/error' },
          ]
        },
        
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lqsong/midway-vue3-ssr' },
    ],
    logo: '/logo.png',
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2022-${new Date().getFullYear()} LiQingSong`
    },
    
  }
  // ...
})

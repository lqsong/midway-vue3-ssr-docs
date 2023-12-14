# 分离第三方库 {#index}

> 分离第三方库的目的是减小公共文件的大小，提高加载速度。

> 这里自己可以选择引入CDN库；也可以把相关的第三方代码下载保存到 `/web/public/` 目录下做项目内部引入。

> 下面用 `vue`、`vue-router`、`pinia`、`element-plus`、`qs`、`axios`举例。

## 一、安装 rollup-plugin-external-globals {#install-lib}

```sh
pnpm add rollup-plugin-external-globals -D
```

在 `/web/vite.config.ts` 中配置：

```ts{5,35-61}
/* eslint-disable node/no-unpublished-import */
import { resolve } from 'path';
import { defineConfig, Plugin, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import externalGlobals from 'rollup-plugin-external-globals';
import analyzer from 'rollup-plugin-analyzer';

// 是否是客户端构建
const isClientBuild = process.env.npm_lifecycle_event === 'build:web:client';

// https://vitejs.dev/config/
export default defineConfig((/* { mode, command } */) => {
  /* 插件 S */
  const plugins: (Plugin | Plugin[])[] = [
    vue(),
    analyzer({ summaryOnly: true }),
   
  ];

  /* 公共配置 S */
  const config: UserConfigExport = {
    root: 'web',
    resolve: {
      alias: {
        '~': resolve(__dirname, '../'),
        '@': resolve(__dirname, './'),
      },
    },    
    plugins,
  };

  /* 不同端配置 S */
  if (true === isClientBuild) {
    // 一、客户端构建
    config.build = {
      rollupOptions: {
        //  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
        external: [
          'vue',
          'vue-router',
          'vue-demi', // VueDemi这个是pinia用来判断是vue2还是vue3所需要的
          'pinia',
          'element-plus',
          'qs',
          'axios',
        ],
        plugins: [
          // 避免打包和生产模式运行出错 在这里声明公共模块
          externalGlobals({
            //  "在项目中引入的变量名称" ："CDN包导出的名称，一般在CDN包中都是可见的"
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-demi': 'VueDemi',
            pinia: 'Pinia',
            'element-plus': 'ElementPlus',
            qs: 'Qs',
            axios: 'axios',
          }),
        ],
      },
    };
  } else {
    // 二、否则服务端构建
  }

  return config;
});

```

## 二、 修改 index.html {#edit-html}

在 `/web/index.html` 中引入：

```html{13-23}
<!DOCTYPE html>
<html lang="en" class="theme-bg-0">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" >
  <title><!--app-title--></title>
  <meta name="keywords" content="!--app-keywords--">
  <meta name="description" content="!--app-description--">

  <link rel="icon" href="/favicon.ico" />


  <!-- Import style -->
  <link rel="stylesheet" href="/js/element-plus/2.4.3/index.min.css">

  <!-- Import JS -->
  <script src="/js/vue/3.3.8/vue.global.min.js"></script>
  <script src="/js/vue-router/4.2.5/vue-router.global.min.js"></script>
  <script src="/js/vue-demi/0.14.6/lib/index.iife.min.js"></script>
  <script src="/js/pinia/2.1.7/pinia.iife.min.js"></script>
  <script src="/js/element-plus/2.4.3/index.full.min.js"></script>
  <script src="/js/qs/6.11.2/qs.min.js"></script>
  <script src="/js/axios/1.6.2/axios.min.js"></script>


  <!--preload-links-->
</head>
<body>
<div id="app"><!--app-html--></div>
<script type="module" src="/entry-client.ts"></script>
<script>
  window.__INITIAL_DATA__ = "<!--app--vue-state-->";
</script>
</body>
</html>
```

## 三、隐藏代码 {#hide}

`/web/assets/css/element-variables.scss` 中代码全部隐藏。


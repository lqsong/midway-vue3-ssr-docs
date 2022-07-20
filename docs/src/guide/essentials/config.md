# 配置 {#index}

配置是开发一个项目的重要环节，它是一个项目的基础。想要了解一个项目，先要了解它的配置。

## web 站点配置 {#web-site-config}

`midway-vue3-ssr` 内置了一个web站点配置文件 `/web/config/settings.ts`。

```ts
/**
 * 站点配置
 * @author LiQingSong
 */
export interface SettingsType {
  /**
   * 站点名称
   */
  siteTitle: string;

  /**
   * 站点本地存储Token 的 Key值
   */
  siteTokenKey: string;

  /**
   * Ajax请求头发送Token 的 Key值
   */
  ajaxHeadersTokenKey: string;

  /**
   * Ajax返回值不参加统一验证的api地址
   */
  ajaxResponseNoVerifyUrl: string[];
}

const settings: SettingsType = {
  siteTitle: 'MIDWAY-VUE3-SSR',

  siteTokenKey: 'midway_vue3_ssr_token',
  ajaxHeadersTokenKey: 'x-token',
  ajaxResponseNoVerifyUrl: [
    '/user/login', // 用户登录
  ],
};

export default settings;

```

## web 路由入口配置 {#web-route-config}

`midway-vue3-ssr` 独立出了一个前端路由入口配置文件 `/web/config/routes.ts`，其目的主要是：统一引入`/web/layouts`下不同`layout`的路由，集中处理重新格式化路由。

目前 `/web/config/routes.ts` 的内容为：

```ts
import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  Router,
} from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import DefaultLayoutRoutes from '@/layouts/DefaultLayout/routes';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';

export const createRouter = (type: RouterType): Router => {
  const router = _createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
      return { top: 0 };
    },
    history: type === 'web' ? createWebHistory() : createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'root',
        component: DefaultLayout,
        children: DefaultLayoutRoutes,
      },
    ],
  });

  router.beforeEach((/* to, from */) => {
    if (!import.meta.env.SSR) {
      // start progress bar
      NProgress.start();
    }
  });

  router.afterEach(() => {
    if (!import.meta.env.SSR) {
      // finish progress bar
      NProgress.done();
    }
  });

  return router;
};

```

::: tip 说明：
详细文档请查看：[路由](/guide/essentials/routing.md)
:::



## vite 配置 {#web-vite-config}

`midway-vue3-ssr` web前端是基于 `vite` 来进行构建，所以有个 vite 配置文件 `/web/vite.config.ts`。

[官方文档](https://cn.vitejs.dev/config/)


## web 环境变量 {#web-env-config}
`midway-vue3-ssr` web前端是基于 `vite` 来进行构建，所以有环境变量配置文件 `/web/.env.development`、`/web/.env.production`。

[官方文档](https://cn.vitejs.dev/guide/env-and-mode.html)

## midway 多环境配置 {#midway-env-config}

`midway-vue3-ssr` Node.js服务端是基于 `Midway` 来进行构建，所以有多环境配置配置文件 `/src/config/**`。

[官方文档](http://www.midwayjs.org/docs/env_config)


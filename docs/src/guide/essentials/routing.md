# 路由 {#index}

路由是组织起一个应用的关键骨架。

本项目路由分两部分：`Vue前端路由` 和 `Midway后端路由`。

## 触发机制 {#trigger-mechanism}

> 区分为以下两种情况

1、 当用户新打开页面或刷新页面：

`Midway后端获取浏览器请求地址，对应到后端路由`->`经过viteServerRender处理`->`Vue前端路由接管，加载对应页面`

2、当页面加载完成点击对应路由链接：

`Vue前端路由直接接管，加载对应页面`

## Vue路由配置参数 {#vue-route-config-param}

:::tip
本项目在原有的 [vue-router](https://router.vuejs.org/) 参数基础上扩展了如下参数：
:::

```ts
import 'vue-router';
// 扩展 vue-router
declare module 'vue-router' {
  // 扩展meta字段
  interface RouteMeta {
    title?: string; // 标题
    keywords?: string; // 关键字
    description?: string; // 说明
    navActive?: string; // 选中的导航
  }
}

```

**示例：**

```ts{7-10}
import { RouteRecordRaw } from 'vue-router';
const DefaultLayoutRoutes: Array<RouteRecordRaw> = [
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: '详情',
            keywords: '详情k',
            description: '详情d',
            navActive: 'about',
        },
        component: () =>
            import(/* webpackChunkName: "detail" */ '@/views/Detail/index.vue'),
    }
];

export default DefaultLayoutRoutes;
```


:::info Seo 说明

`title`: seo标题，html的title标签内容

`keywords`: seo关键字，html的meta标签name="keywords"的内容

`description`: seo说明，html的meta标签name="description"的内容

高级用法请查看 [seo 方法](/guide/essentials/seo.md)。
:::

:::info 


`navActive`：用于设置选中的导航栏，需要在`.vue`模板中配合代码判断；此参数存在的原因，一般是因为详情页需要选中对应的导航，或其他特殊情况。

```vue{3-5}
<template>
    <nav>
      <router-link to="/" :class="{'active': meta.navActive === 'home'}">Home</router-link> |
      <router-link to="/about" :class="{'active': meta.navActive === 'about'}">About</router-link> |
      <router-link :to="{path:'/localapi', query: {'uid':10}}" :class="{'active': meta.navActive === 'localapi'}">LocalApi</router-link>
    </nav>
    <router-view></router-view>
</template>
```

:::

## Vue路由 {#vue-route}

本项目设计了一个vue路由入口配置文件 `/web/config/routes.ts`，然后分别把路由拆分到了不同的`/web/layouts`中去配置，这样做的原因：一是在入口文件方便集中处理重新格式化；二是模块化更规范。

**/web/config/routes.ts**

```ts
/* 
 * # /web/config/routes.ts
 */
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

**/web/layouts/DefaultLayout/routes.ts**

```ts
/* 
 * # /web/layouts/DefaultLayout/routes.ts 
 */
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';

const DefaultLayoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页',
      keywords: '首页k',
      description: '首页d',
      navActive: 'home',
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      keywords: '关于k',
      description: '关于d',
      navActive: 'about',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情',
      keywords: '详情k',
      description: '详情d',
      navActive: 'about',
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/Detail/index.vue'),
  },
  {
    path: '/localapi',
    name: 'localapi',
    meta: {
      title: '请求本地api样列',
      keywords: '请求本地,api样列',
      description: '请求本地midway服务api样列',
      navActive: 'localapi',
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Localapi/index.vue'),
  },
];

export default DefaultLayoutRoutes;

```

 `Vue路由` 详细规则请查看 [官方文档](https://router.vuejs.org/)。


## Midway路由 {#midway-route}

> Midway 提供了这些装饰器: @Get 、 @Post 、 @Put() 、 @Del() 、 @Patch() 、 @Options() 、 @Head() 和 @All() ，表示各自的 HTTP 请求方法。

本项目Demo提供的样列在 `/src/controller/home.controller.ts` 中：

```ts
import { App, Inject, Controller, Get, ContentType } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

import { render } from '../vite.server';

@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  @Get('/about')
  @Get('/detail')
  @Get('/localapi')
  @ContentType('text/html')
  async home(): Promise<void> {
    this.ctx.body = render(this.ctx, this.app);
  }
}

```

> @Get('/about') 、@Get('/detail') 、 @Get('/localapi') 可以用  @Get('/*')代替，这样后期就不用管这里了，只需要写前端路由就可以了，如下样例：

```ts{15}
import { App, Inject, Controller, Get, ContentType } from '@midwayjs/decorator';
import { Application, Context } from '@midwayjs/koa';

import { render } from '../vite.server';

@Controller('/')
export class HomeController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Get('/')
  @Get('/*')
  @ContentType('text/html')
  async home(): Promise<void> {
    this.ctx.body = render(this.ctx, this.app);
  }
}

```

 `Midway路由` 详细规则请查看 [官方文档](http://www.midwayjs.org/docs/env_config)。






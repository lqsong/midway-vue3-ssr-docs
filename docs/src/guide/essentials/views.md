# 视图 {#index}

本项目视图分两部分：`Vue前端页面` 和 `Midway后端模板渲染`。

## Vue html模板 {#vue-html}

你可以修改默认的Vue html模板。

默认的Vue html模板，位置在 `/web/index.html`,默认内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!--app-title--></title>
  <meta name="keywords" content="!--app-keywords--">
  <meta name="description" content="!--app-description--">

  <link rel="icon" href="/favicon.ico" />

  
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

举个例子，你可以添加自定义的`script`标签或代码块等其他内容：

```html{22}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!--app-title--></title>
  <meta name="keywords" content="!--app-keywords--">
  <meta name="description" content="!--app-description--">

  <link rel="icon" href="/favicon.ico" />

  
  <!--preload-links-->
</head>
<body>
<div id="app"><!--app-html--></div>
<script type="module" src="/entry-client.ts"></script>
<script>
  window.__INITIAL_DATA__ = "<!--app--vue-state-->";
</script>

<script src="http://echarts.com/echarts.js"></script>

</body>
</html>

```

::: warning 
注意：`<!--app-title-->`、`!--app-keywords--`、`!--app-description--`、`<!--preload-links-->`、`<!--app-html-->`、`<!--app--vue-state-->`等插槽名称切记不要修改或删除。
:::


## Vue 布局 {#vue-layout}

在 `/web/layouts` 目录下你可以修改默认布局或创建自定义的布局。

::: tip 
 别忘了在布局文件中添加 `<router-view></router-view>` 组件用于显示页面的主体内容。
:::

### 默认布局 {#vue-layout-default}

`/web/layouts/DefaultLayout/index.vue` 源码如下：

```vue
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, RouteMeta } from 'vue-router';
const route = useRoute();
const meta = computed<RouteMeta>(()=> route.meta);
</script>
<template>
    <nav>
      <router-link to="/" :class="{'active': meta.navActive === 'home'}">Home</router-link> |
      <router-link to="/about" :class="{'active': meta.navActive === 'about'}">About</router-link> |
      <router-link :to="{path:'/localapi', query: {'uid':10}}" :class="{'active': meta.navActive === 'localapi'}">LocalApi</router-link>
    </nav>
    <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.active {
  color: #42b983;
}
</style>

```

### 自定义布局 {#vue-layout-customize}

假设我们要创建一个 **博客布局** 并将其保存到 `/web/layouts/BlogLayout/index.vue`:

```vue
<template>
    <div>这个是我的博客导航栏</div>
    <router-view></router-view>
</template>
```

然后我们必须再次创建一个 `/web/layouts/BlogLayout/routes.ts` 文件设置路由并确定哪些页面用到此布局：

```ts
import { RouteRecordRaw } from 'vue-router';

const BlogLayoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      keywords: '关于k',
      description: '关于d',
      navActive: 'about',
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
  },
];

export default BlogLayoutRoutes;

```

最后我们需要到 `/web/config/router.ts` 中配置上：

```ts
import BlogLayoutRoutes from '@/layouts/BlogLayout/routes';
import BlogLayout from '@/layouts/BlogLayout/index.vue';

export const createRouter = (type: RouterType): Router => {
  const router = _createRouter({
    // ......
    routes: [
      //......
      {
        path: '/blog',
        name: 'blog',
        component: BlogLayout,
        children: BlogLayoutRoutes,
      },
    ],
  });

  // .....

  return router;
};

```



## Vue 页面 {#vue-page}

页面组件实际上是 Vue 组件，只不过 `midway-vue3-ssr` 为这些组件添加了一些特殊的配置项（对应 `midway-vue3-ssr` 提供的功能特性）以便你能快速开发通用应用。

```vue{6-15}
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useDetailStore } from "./store";
import { Article } from "./data.d";
export default defineComponent({
  async asyncData({store, route}) {
    const detailStore = useDetailStore(store);
    await detailStore.getDetail('2022');
  },
  seo({store}) {
   const detailStore = useDetailStore(store);
   return {
      title: detailStore.article.title + '-详情测试',
   }
  }
})
</script>
<script lang="ts" setup>
// 读取数据
const detailStore = useDetailStore();
const article = computed<Article>(()=>detailStore.$state.article)
</script>
<template>
  <div class="detail">
    <p>{{article.title}}</p>
    <p>{{article.addtime}}</p>
    <p>{{article.content}}</p>
  </div>
</template>
<style lang="scss" scoped>

</style>
```

`midway-vue3-ssr` 在 `vue` 原有的基础上扩展了 [asyncData 方法](/guide/essentials/async-data.md) 和 [seo 方法](/guide/essentials/seo.md)，使用规则你可以点击链接查看明细。


## Midway模板渲染 {#midway-html}

使用此框架你也可以不用 `vue ssr`，选择原始的模板渲染。

 `Midway模板渲染` 详细规则请查看 [官方文档](http://www.midwayjs.org/docs/extensions/render)。


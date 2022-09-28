# seo 方法 {#index}

`midway-vue3-ssr` 扩展了 Vue.js，增加了一个叫 seo 的方法，使得我们可以在设置组件的数据之前能设置或重置当前页面的seo。

## 说明 {#illustrate}

`seo`方法会在组件每次加载之前被调用。它可以在服务端或路由更新之前，[asyncData 方法](/guide/essentials/async-data.md)之后被调用。在这个方法被调用的时候，第一个参数被设定为 [store](/guide/essentials/store-pinia.md) 与 [route](/guide/essentials/routing.md)的集合`IAsyncDataContext`类型，你可以利用 seo方法来设置或重置当前页面的seo，框架会将 seo 返回的数据与[路由](/guide/essentials/routing.md#vue-route-config-param)中设置的seo融合，最后一并设置到当前页面。

:::tip 注意：

如果设置了seo方法，seo方法必须返回`Seo`类型，哪怕是一个空的`Seo`类型。

seo方法返回的`Seo`字段优先级比[路由](/guide/essentials/routing.html#vue-route-config-param)中设置的seo字段高。

seo方法存在的原因是为了解决特殊需求，如：详情页面的title需要根据标题进行显示。一般情况下[路由](/guide/essentials/routing.html#vue-route-config-param)中seo字段已经够用。

:::

### 类型 {#illustrate-type}

```ts
export interface Seo {
  title?: string;
  keywords?: string;
  description?: string;
}

export interface IAsyncDataContext {
  route: RouteLocationNormalizedLoaded;
  store: Pinia;
  router: Router;
  ctx?: Context; // 在服务端运行时存在
}
declare module 'vue' {
  interface ComponentCustomOptions {
    seo?(context: IAsyncDataContext): Seo;
  }
}
```

## 使用 {#use}

```vue{5-10}
<script lang="ts">
import { defineComponent } from 'vue'
import { useDetailStore } from "./store";
export default defineComponent({
  seo({store}) {
   const detailStore = useDetailStore(store);
   return {
      title: detailStore.article.title + '-详情测试',
   }
  }
})
</script>
```



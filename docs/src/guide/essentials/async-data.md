# asyncData 方法 {#index}

`midway-vue3-ssr` 扩展了 Vue.js，增加了一个叫 asyncData 的方法，使得我们可以在设置组件的数据之前能获取或处理数据。

## 说明 {#illustrate}

`asyncData`方法会在组件每次加载之前被调用。它可以在服务端或路由更新之前被调用。在这个方法被调用的时候，第一个参数被设定为 [store](/guide/essentials/store-pinia.md) 与 [route](/guide/essentials/routing.md)的集合`IAsyncDataContext`类型，你可以利用 asyncData方法来获取数据。

### 类型 {#illustrate-type}

```ts
export interface IAsyncDataContext {
  route: RouteLocationNormalizedLoaded;
  store: Pinia;
}
declare module 'vue' {
  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>;
  }
}
```

## 使用 {#use}



### async {#use-async}

```vue{5-8}
<script lang="ts">
import { defineComponent} from 'vue'
import { useAboutStore, IAboutState } from "./store";
export default defineComponent({
  async asyncData({store, route}) {
    const aboutStore = useAboutStore(store);
    await aboutStore.getList({current: Number(route.query.page || 1)});
  }
})
</script>
```

### 数据展示 {#use-data}

```vue{5,12-20}
<script lang="ts" setup>
import { useAboutStore, IAboutState } from "./store";
// 读取数据
const aboutStore = useAboutStore();
const tableData = computed<IAboutState>(()=>aboutStore.$state);
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box">
      <ul v-loading="tableData.loading">
        <li v-for="item in tableData.list">

          <div>
            <router-link :to="{ path: '/detail', query: { id: item.id }}">
              {{item.title}}
            </router-link>
            <span>{{item.addtime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
```

### 监听 query 参数改变 {#use-query}

默认情况下，query 的改变不会调用 `asyncData` 方法。如果需要，可以监听这个行为。例如，在构建分页组件时，您可以设置 `watch` 监听参数。如下样列：

```vue{18-26}
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useRoute } from "vue-router"
import Pagination from "@/components/Pagination/base.vue";
import { useAboutStore, IAboutState } from "./store";
export default defineComponent({
  async asyncData({store, route}) {
    const aboutStore = useAboutStore(store);
    await aboutStore.getList({current: Number(route.query.page || 1)});
  }
})
</script>
<script lang="ts" setup>
// 读取数据
const aboutStore = useAboutStore();
const tableData = computed<IAboutState>(()=>aboutStore.$state);

const route = useRoute();
const page = computed(()=>route.query.page);

watch(page,()=> {
  if(route.path !== '/about') {
    return;
  }
 aboutStore.getList({current: Number(page.value || 1)});
})
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box">
      <ul v-loading="tableData.loading">
        <li v-for="item in tableData.list">

          <div>
            <router-link :to="{ path: '/detail', query: { id: item.id }}">
              {{item.title}}
            </router-link>
            <span>{{item.addtime}}</span>
          </div>
        
        </li>
      </ul>
      <div>
        <pagination :total="tableData.pagination.total" :current-page="tableData.pagination.current" page-url="/about?page={page}"></pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  text-align: left;
  ul {
    li {
      padding: 5px 0;
     div {
      display: flex;
      justify-content: space-between;
     }
    }
  }
}
@media (max-width: 767px) {
  .box {
    padding: 15px;
  }
}
</style>

```
















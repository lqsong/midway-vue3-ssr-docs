# 状态管理(Pinia) {#index}

对于每个大项目来说，使用状态树 (store) 管理状态 (state) 十分有必要。

并且本项目在 `vue` 原有的基础上扩展了 [asyncData 方法](/guide/essentials/async-data.md) 和 [seo 方法](/guide/essentials/seo.md)，状态树 (store)也是嵌入其中的。

## Pinia 说明 {#pinia-illustrate}

[Pinia](https://pinia.vuejs.org/) 是一个状态管理库，由 Vue 核心团队维护，对 Vue 2 和 Vue 3 都可用。

现有用户可能对 Vuex 更熟悉，它是 Vue 之前的官方状态管理库。由于 Pinia 在生态系统中能够承担相同的职责且能做得更好，因此 Vuex 现在处于维护模式。它仍然可以工作，但不再接受新的功能。对于新的应用程序，建议使用 Pinia。

事实上，Pinia 这款产品最初是为了探索 Vuex 的下一个版本，整合了核心团队关于 Vuex 5 的许多想法。最终，Pinia 已经实现了想要在 Vuex 5 中提供的大部分内容，同时 Evan You 已经于 2021年11月24日 在推特宣布 Pinia 正式成为 vuejs 官方的状态库，意味着 Pinia 就是 Vuex 5 。

相比于 Vuex，Pinia 提供了更简洁直接的 API，并提供了组合式风格的 API，最重要的是，在使用 TypeScript 时它提供了非常好的类型推导。

## Pinia 使用 {#pinia-use}

你可以在 `/web/store` 下创建文件，或者在每个页面目录下创建文件，如下样列：

**/web/store/user.ts** 中定义

```ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: '',
    };
  },
});

```

**/web/views/About/store.ts** 中定义

```ts
/**
 * About store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { ResponseData } from '@/utils/request';
import {
  TableListItem,
  PaginationConfig,
  ResponseDataType,
  TableListQueryParams,
} from './data.d';
import { queryList } from './service';

export interface IAboutState {
  loading: boolean;
  list: TableListItem[];
  pagination: PaginationConfig;
}

export const useAboutStore = defineStore('about', {
  state(): IAboutState {
    return {
      loading: false,
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    };
  },
  actions: {
    async getList(params?: TableListQueryParams) {
      try {
        this.loading = true;
        const response: ResponseData<ResponseDataType> = await queryList(
          params
        );
        const data = response.data;
        if (data) {
          this.list = data.list || [];
          this.pagination = {
            ...this.pagination,
            total: data.total,
            current: params ? params.current || 1 : 1,
          };
        }
        this.loading = false;
      } catch (error: any) {
        console.log('error useAboutStore getList', error);
      }
    },
  },
});

```


**/web/views/About/index.vue** 中使用

```vue{5,8,9,15,16,25}
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

::: tip 
详细规则请查看 [Pinia 官方文档](https://pinia.vuejs.org/)。
:::






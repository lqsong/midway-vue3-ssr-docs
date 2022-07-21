# UI 组件 {#index}

`midway-vue3-ssr` 默认集成了 `Element Plus` UI组件库，并且是完整引入，你可以调整它为自动引入或删除它换成以下其它的组件库。

## Element Plus {#element-plus}

经典中的经典，基于 Vue 3，面向设计师和开发者的组件库。

### 安装 {#element-plus-install}

```sh
pnpm add element-plus
```

### 完整引入 {#element-plus-import}

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

### 自动导入 {#element-plus-import-auto}

```sh
# 需要安装以下插件
pnpm add -D unplugin-vue-components unplugin-auto-import
```

详细内容请查看 [官方文档](https://element-plus.gitee.io/zh-CN/) 、 [Github](https://github.com/element-plus/element-plus)。


## Ant Design Vue {#ant-design-vue}

Ant Design 的 Vue 实现，蚂蚁前端 UI 库，开发和服务于企业级后台产品。

### 安装 {#ant-design-vue-install}

```sh
pnpm add ant-design-vue
```

### 完整引入 {#ant-design-vue-import}

```ts
// main.ts
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(Antd).mount('#app');
```

### 自动导入 {#ant-design-vue-import-auto}

```sh
# 需要安装以下插件
pnpm add -D unplugin-vue-components unplugin-auto-import
```

详细内容请查看 [官方文档](https://www.antdv.com/docs/vue/introduce-cn) 、 [Github](https://github.com/vueComponent/ant-design-vue)。




## Tdesign Vue Next {#tdesign-vue-next}

鹅厂优质 UI 组件，配套工具完整，设计工整，文档清晰。

### 安装 {#tdesign-vue-next-install}

```sh
pnpm add tdesign-vue-next
```

### 完整引入 {#tdesign-vue-next-import}

```ts
// main.ts
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './app.vue';

// 引入组件库全局样式资源
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TDesign);
app.mount('#app')
```

### 自动导入 {#tdesign-vue-next-import-auto}

```sh
# 需要安装以下插件
pnpm add -D unplugin-vue-components unplugin-auto-import
```

详细内容请查看 [官方文档](https://tdesign.tencent.com/vue-next/getting-started) 、 [Github](https://github.com/Tencent/tdesign-vue-next)。



## Arco Design Vue {#arco-design-vue}

字节跳动 UI 组件库开源，大厂逻辑，设计文档完美。

### 安装 {#arco-design-vue-install}

```sh
pnpm add  @arco-design/web-vue
```

### 完整引入 {#arco-design-vue-import}

```ts
// main.ts
import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(ArcoVue);
app.mount('#app');
```

### 自动导入 {#arco-design-vue-import-auto}

```sh
# 需要安装以下插件
pnpm add -D unplugin-vue-components unplugin-auto-import
```

详细内容请查看 [官方文档](https://arco.design/vue/docs/start) 、 [Github](https://github.com/arco-design/arco-design-vue)。



## Vant {#vant}

有赞团队开源，轻量、可靠的移动端 Vue 组件库。


### 安装 {#vant-install}

```sh
pnpm add vant
```

### 完整引入 {#vant-import}

```ts
// main.ts
import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp();
app.use(Vant);
app.mount('#app');
```

### 自动导入 {#vant-import-auto}

```sh
# 需要安装以下插件
pnpm add -D unplugin-vue-components unplugin-auto-import
```

详细内容请查看 [官方文档](https://vant-contrib.gitee.io/vant/#/zh-CN/home) 、 [Github](https://github.com/youzan/vant)。


## Nutui {#nutui}

京东风格的轻量级移动端 Vue 组件库，移动端友好，面向电商业务场景。

详细内容请查看 [官方文档](https://nutui.jd.com/) 、 [Github](https://github.com/jdf2e/nutui)。


##  Varlet {#varlet}

Varlet 是一个基于 Vue3 开发的 Material 风格移动端组件库，全面拥抱 Vue3 生态，由社区团队维护。支持 Typescript、按需引入、暗黑模式、主题定制、国际化，并提供 VSCode 插件保障良好的开发体验

详细内容请查看 [官方文档](https://varlet-varletjs.vercel.app/) 、 [Github](https://github.com/varletjs/varlet)。


## Naive-UI {#naive-ui}

宝藏 Vue UI 库，Vue UI 新星，从 Vue 3 起步(比较完整，主题可调，使用 TypeScript，快)

详细内容请查看 [官方文档](https://www.naiveui.com/zh-CN/) 、 [Github](https://github.com/TuSimple/naive-ui)。






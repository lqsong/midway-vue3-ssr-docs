# 快速开始 {#index}


## 安装 {#install}

```bash
# 克隆项目
git clone https://github.com/lqsong/midway-vue3-ssr.git

# 进入项目目录
cd midway-vue3-ssr

# 复制文件
copy src/config/config.default.ts  src/config/config.local.ts # 启用或修改里面的参数
copy src/config/config.default.ts  src/config/config.prod.ts # 启用或修改里面的参数
copy web/.env.development  web/.env.development.local # 启用或修改里面的参数

# 安装依赖，请使用 pnpm 
pnpm i 

# 本地开发 启动项目
pnpm dev

```

> 推荐使用 pnpm , **[pnpm的安装与使用](http://liqingsong.cc/article/detail/26)** 。


<br/>

启动完成后，打开浏览器访问 [http://localhost:8002](http://localhost:8002)， 你看到下面的页面就代表操作成功了。

![Home](/images/home.png)

接下来你可以修改代码进行业务开发了，本项目内创建了常见的`Demo`：页面模板、模拟数据、路由、数据请求等等，你可以继续阅读和探索左侧的其它文档。



## 目录结构 {#directory-structure}

本项目已经为你生成了一个完整的开发框架，下面是整个项目的目录结构。

```bash
├── src                        # Midway 生成的源代码目录
│   ├── config                 # 配置目录
│   │   ├── config.default.ts  # 默认配置
│   │   ├── config.local.ts    # 本地配置
│   │   ├── config.prod.ts     # 生产配置(prod优先级比production高)
│   │   └── config.production.ts # 生产配置
│   ├── controller             # Web Controller 目录
│   │   ├── api.controller.ts  # api Controller demo
│   │   └── home.controller.ts # 默认入口控制器（在此执行前端实现ssr）
│   ├── filter                 # 过滤器目录
│   ├── middleware             # 中间件目录
│   ├── service                # 服务逻辑目录
│   ├── configuration.ts       # Midway 配置入口
│   ├── interface.ts           # 全局ts 接口文件
│   └── vite.server.ts         # vite 服务文件
├── test                       # Midway 生成的测试目录
├── web                        # Vue 源代码
│   ├── @types                 # ts类型定义目录
│   │   ├── client.d.ts        # 客服端ts类型定义
│   │   ├── env.d.ts           # 环境变量类型定义
│   │   ├── vue-extend.d.ts    # 自定义扩展vue类型
│   │   └── vue-router.d.ts    # 自定义扩展路由类型
│   ├── assets                 # 静态资源目录
│   │   ├── css                # 公用 CSS 样式目录
│   │   └── images             # 图片目录
│   ├── components             # Vue全局公用组件目录
│   ├── composables            # Vue全局组合式API目录
│   ├── config                 # 配置目录
│   │   │── routes.ts          # Vue路由配置入口
│   │   └── settings.ts        # 站点配置
│   ├── layout                 # Vue项目 layout
│   │   ├── DefaultLayout      # Vue项目默认Layout
│   │   │   ├── index.vue      # DefaultLayout 模板入口
│   │   │   └── routes.ts      # 使用 DefaultLayout 的页面路由配置
│   │   └── BlankLayout.vue    # 空 Layout
│   ├── public                 # 静态资源
│   ├── store                  # 全局 Store 数据模型目录（Pinia）
│   │   └── user.ts            # user 公共Pinia Store 
│   ├── utils                  # 全局工具函数目录
│   ├── views                  # 页面组件目录(所有页面放在这里)
│   │   └── About              # 页面-关于(这里作为说明样例)
│   │       ├── components     # 当前页面组件目录(可选)
│   │       ├── composables    # 当前页面组合式 API(可选)
│   │       ├── data.d.ts      # TS 类型定义文件(可选)
│   │       ├── index.vue      # 当前页面入口
│   │       ├── service.ts     # 当前页面数据接口文件(可选)
│   │       └── store.ts       # 当前页面Pinia store文件(可选)
│   ├── .env.development       # 开发环境变量配置
│   ├── .env.production        # 生产环境变量配置
│   ├── index.html             # html模板
│   ├── App.vue                # App 入口
│   ├── entry-client.ts        # 客户端入口文件
│   ├── entry-server.ts        # 服务端入口文件
│   ├── main.ts                # 公共入口文件 加载组件 初始化等
│   ├── tsconfig.json          # web目录ts配置文件
│   └── vite.config.ts         # vite 配置
├── .editorconfig              # 编辑配置
├── .eslintrc.json             # eslint 配置项
├── .gitignore                 # Git忽略文件配置
├── .prettierrc.js             # prettier 配置
├── jest.config.js             # jest config
├── bootstrap.js               # Midway 生产模式启动入口
├── package.json               # 项目信息
├── README.md                  # readme
└── tsconfig.json              # Midway的ts配置，不包括web目录
```

:::tip 
`src/config/config.local.ts` 本地开发环境重置，修改端口参数等等，已追加到 `.gitignore` 文件中，禁止提交。

`src/config/config.prod.ts`  本地生产环境重置，修改端口参数等等，已追加到 `.gitignore` 文件中，禁止提交。
:::


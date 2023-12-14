# gzip 压缩 {#index}

> gzip是现今Internet 上使用非常普遍的一种数据压缩格式（一种文件格式）。

> HTTP协议上的GZIP编码是一种用来改进WEB应用程序性能的技术。大流量的WEB站点常常使用GZIP压缩技术来让用户感受更快的速度。这一般是指www服务器中安装的一个功能，当有人来访问这个服务器中的网站时，服务器中的这个功能就将网页内容压缩后传输到来访的电脑浏览器中显示出来.一般对纯文本内容可压缩到原大小的40%.这样传输就快了，效果就是你点击网址后会很快的显示出来.当然这也会增加服务器的负载.一般服务器中都安装有这个功能模块的。

所以，gzip我们需要在打包的时候生成，还得在服务器开启。

## 一、前端开启gzip {#c-gzip}

项目已经内置配置好了gzip，在 `/web/vite.config.ts` 中：

```ts{18-30}
/* eslint-disable node/no-unpublished-import */
import { resolve } from 'path';
import { defineConfig, Plugin, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import analyzer from 'rollup-plugin-analyzer';

// 是否是客户端构建
const isClientBuild = process.env.npm_lifecycle_event === 'build:web:client';

// https://vitejs.dev/config/
export default defineConfig((/* { mode, command } */) => {
  /* 插件 S */
  const plugins: (Plugin | Plugin[])[] = [
    vue(),
    analyzer({ summaryOnly: true }),

    // 构建压缩文件
    viteCompression({
      // 是否在控制台输出压缩结果，默认为 true
      verbose: true,
      // 是否禁用压缩，默认为 false
      disable: false,
      // 启用压缩的文件大小最小限制，单位字节（byte），默认为 0，1b(字节)=8bit(比特), 1KB=1024B
      threshold: 10240, // 即10kb以上即会压缩
      // 采用的压缩算法，默认是 gzip
      algorithm: 'gzip',
      // 生成的压缩包后缀
      ext: '.gz',
    }),
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
    server: {
      proxy: {
        '^/api/.*': {
          // 代理到本地8002端口，根据src/config/config.default.ts 中 port设置
          target: `http://127.0.0.1:${process.env.MIDWAY_HTTP_RORT || 8002}`,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins,
  };

  /* 不同端配置 S */
  if (true === isClientBuild) {
    // 一、客户端构建
  } else {
    // 二、否则服务端构建
  }

  return config;
});

```

## 二、服务器开启gzip {#s-gzip}

这里用nginx举例：

```sh
server {
    location / {

        gzip_static on;

        gzip_comp_level 5;

    }
}

```
>  `gzip_static on` 这个配置告诉Nginx使用预压缩文件（.gz文件），如果存在的话，而不是实时压缩。这样可以提高压缩的效率，尤其对于静态文件来说。

>  `nginx -s reload` 重启ng

| 配置项	| 作用	| 示例    | 
| ------- | ------- | ------- |
| gzip	| 是否开启gzip压缩| 	gzip on;| 
| gzip_types| 	指定要压缩的MIME类型| 	gzip_types text/html text/plain application/javascript;| 
| gzip_min_length| 	指定最小压缩文件大小| 	gzip_min_length 1000;| 
| gzip_comp_level| 	指定压缩级别 范围为1到9,值越大压缩程度越大| 	gzip_comp_level 6;| 
| gzip_buffers| 	指定用于gzip压缩的内存缓冲区大小| 	gzip_buffers 16 8k;| 
| gzip_disable| 	指定不使用gzip压缩的User-Agent| 	gzip_disable “MSIE [1-6].(?!.*SV1)”;| 
| gzip_proxied| 	根据客户端请求中的"Accept-Encoding"头部决定是否压缩响应，取值可以是 “off”、“expired”、“no-cache”、“no-store”、“private”、“no_last_modified”、“no_etag”、“auth” 或 “any”| 	gzip_proxied any；| 
| gzip_vary| 	如果发送的响应被gzip压缩，则在响应头部加上"Vary: Accept-Encoding"，以通知缓存服务器响应内容可能以压缩或非压缩形式存在| 	gzip_vary:on;| 
| gzip_http_version| 	设置进行gzip压缩的HTTP协议版本。| 	gzip_http_version:1.0| 

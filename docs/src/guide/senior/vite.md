# Vite 服务 {#index}

本项目是结合 `vite ssr` 实现的，所以在 `src` 目录下有个 `vite.server.ts` 文件。

vite.server分为以下几项：

## createViteServer 方法 {#create-vite-server}

此方法是为开发模式创建的，当处于开发环境时，此方法会启用vite server并返回。

```ts
let viteServer: vite.ViteDevServer;
export async function createViteServer(app: Application) {
  viteServer = !viteServer
    ? await vite.createServer({
        root: 'web',
        logLevel: 'error',
        server: {
          middlewareMode: true,
        },
      })
    : viteServer;

  app.use(koaConnect(viteServer.middlewares));

  return viteServer;
}
```

## renderDev 方法 {#render-dev}

此方法是为开发模式创建的，当处于开发环境时，此方法会render html。

```ts
export async function renderDev(ctx: Context, viteServer: vite.ViteDevServer) {
  try {
    let template = fs.readFileSync(resolve('../web/index.html'), 'utf-8');
    template = await viteServer.transformIndexHtml(ctx.originalUrl, template);
    const { render } = await viteServer.ssrLoadModule('/entry-server.ts');
    const [appHtml, preloadLinks, meta, state] = await render(
      ctx.originalUrl,
      {}
    );
    const html = template
      .replace('"<!--app--vue-state-->"', state)
      .replace('<!--app-title-->', meta.title)
      .replace('!--app-keywords--', meta.keywords)
      .replace('!--app-description--', meta.description)
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml);
    return html;
  } catch (e) {
    viteServer && viteServer.ssrFixStacktrace(e);
    console.log(e.stack);
    ctx.throw(500, e.stack);
  }
}
```


## renderProd 方法 {#render-prod}

此方法是为生产模式创建的，当处于生产环境时，此方法会render html。

```ts
export async function renderProd(ctx: Context) {
  try {
    const [appHtml, preloadLinks, meta, state] = await prodRender(
      ctx,
      manifest
    );
    const html = template
      .replace('"<!--app--vue-state-->"', state)
      .replace('<!--app-title-->', meta.title)
      .replace('!--app-keywords--', meta.keywords)
      .replace('!--app-description--', meta.description)
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml);
    return html;
  } catch (e) {
    ctx.throw(500, e.stack);
  }
}
```




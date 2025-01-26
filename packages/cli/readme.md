# 说明文档
## `vue-component-cli`: 一个帮助你快速搭建和开发前端项目的CLI

如何安装？

```shell
npm install @lt/vue-component-cli -g
```

## 项目开发

项目开发目前提供三个功能：

* 创建Vue组件
* 创建Vue页面，并配置路由
* 创建pinia子模块



### 创建Vue组件：

````shell
lt addcpn YourComponentName # 例如lt add NavBar，默认会存放到src/components文件夹中
lt addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
````



### 创建Vue页面，并配置路由

```shell
lt addpage YourPageName # 例如lt addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
lt addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

为什么会创建router.js文件：

* `router.js`文件是路由的其中一个配置；
* 创建该文件中 `src/router/index.js`中会自动加载到路由的 `routes`配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）

`src/router/index.js`中已经完成如下操作：

```js
// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
```



### 创建pinia子模块

```shell
lt addstore YourStoreChildModuleName # 例如lt addstore home，默认会放到src/store/home/index.js
lt addstore YourStoreChildModuleName -d src/store/test # 也可以指定文件夹
```

创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

```js
// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
```

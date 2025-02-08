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
lt addcpn YourComponentName -d src/views/home # 也可以指定存放的具体文件夹
````



### 创建Vue3页面，并配置路由

```shell
lt add YourPageName # 例如lt addpage Home，默认会放到src/views/home/Home.vue中，并且会创建src/views/home/router.js
lt add YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
```

### 针对monorepo项目添加vue3页面，并配置路由
```shell
lt add testPageAndRouter -d apps/project1/src/views/main/system/testPageAndRouter

# 或
lt madd testPageAndRouter project1 -d views/main/system/testPageAndRouter

# 默认会放到apps/project1/src/views/testPageAndRouter/TestPageAndRouter.vue中，并且会创建apps/project1/src/router/testPageAndRouter/testPageAndRouter.js
```

### 创建pinia子模块

```shell
lt addstore YourStoreChildModuleName # 例如lt addstore home，默认会放到src/store/home/index.js
lt addstore YourStoreChildModuleName -d src/store/test # 也可以指定文件夹
```

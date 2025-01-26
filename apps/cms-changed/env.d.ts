/// <reference types="vite/client" />

// .vue文件的声明，声明导出是一个组件
// 不声明就能导出是因为volar插件，类型是any，需要关闭vetur插件
// 关闭volar插件才能正常显示自己定义的vue文件导出类型
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
declare module '*.mjs'

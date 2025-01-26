import { createApp } from 'vue'
// 引入第三方库默认重置
import 'normalize.css'
import './assets/css/index.less'
// 自己引入vue文件最好在.d.ts中声明其是组件
import App from './App.vue'
import router from './router'
import registerStore from './store' // 因为是默认导出，registerStore也可用任意字符，如store
import registerIcons from './global/register-icons'

// 三、1.针对ElMessage和ElLoading等组件引入样式（全局）==> 安装vite-plugin-style-import插件并在vite.config.ts中配置
// import 'element-plus/theme-chalk/el-message.css'

// 一、ElementPuls
// 1.全局引入（3行代码）
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css' // 引入样式
// app.use(ElementPlus) // use作用：拿到所有组件进行全局注册
// 2. 按需引入全局注册
// 3. 按需引入局部注册——在需要的组件内引入

// 可以直接引入其他文件，因为已经在env.d.ts中声明
// import './assets/main.css'

// 二、1.图标的全局注册 ==> 2.src下新建global文件夹，使用use函数，注册函数会被自动调用传入一个参数（图标全局注册抽离）
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

// 链式
// createApp(App).use(router).use(pinia).mount('#app')
const app = createApp(App) // ctrl + 左键查看类型，app类型是createApp函数返回值的类型
app.use(registerIcons) // 图标全局注册抽离
// app.use(pinia)
// // 默认加载数据及添加动态路由
// const loginStore = useLoginStore()
// loginStore.loadLocalCacheAction()
app.use(registerStore) // 函数当参数时会被自动执行

app.use(router)
app.mount('#app')

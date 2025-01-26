// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log('当前环境', import.meta.env.MODE) // 当前环境
// console.log('是否开发环境', import.meta.env.DEV) // 是否开发环境
// console.log('是否生产环境', import.meta.env.PROD) // 是否生产环境 npm run build => npm run preview，可预览打包后的文件
// console.log('是否是服务器端渲染', import.meta.env.SSR) // 是否是服务器端渲染(server side render)

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://123.207.32.32:5001'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
  // BASE_URL = 'http://coderba.com:5000'
}

// console.log(BASE_URL)

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_NAME)
// console.log(import.meta.env.VITE_BASE_URL)

export const TIME_OUT = 10000
export { BASE_URL }

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// elementPlus自动导入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  // 插件，打包时识别vue文件
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
  resolve: {
    // 别名，默认es6语法，用于打包的时候路径转换
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Mycomponents': fileURLToPath(new URL('../../components', import.meta.url)),
      '@test': fileURLToPath(new URL('../../test', import.meta.url)),
    }
  },
  server: {
    port: 8086
  }
})

<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
// 不能自动识别.mjs文件，需要声明
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  /* 基于视口，不必定义父元素 */
  width: 100vw;
  height: 100vh;
}
</style>

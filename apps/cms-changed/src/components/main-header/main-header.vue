<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="26px" :title="isFold ? '展开' : '折叠'">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cnpns/header-info.vue'
import headerCrumb from './c-cnpns/header.crumb.vue'

// 1.内部自定义事件
const emit = defineEmits(['foldChange'])

// 2.记录状态
const isFold = ref(false) // 记录折叠状态
function handleMenuIconClick() {
  // 2.1.内部改变状态
  isFold.value = !isFold.value

  // 2.2.将时间和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>

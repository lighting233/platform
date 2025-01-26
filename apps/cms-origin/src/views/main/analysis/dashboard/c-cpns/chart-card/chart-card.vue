<template>
  <div class="chart-card">
    <!-- #header 插槽 或 header 属性 -->
    <el-card class="box-card" :header="header">
      <slot></slot>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface Ipops {
  header?: string
}
withDefaults(defineProps<Ipops>(), {
  header: '默认标题'
})
</script>

<style lang="less" scoped></style>

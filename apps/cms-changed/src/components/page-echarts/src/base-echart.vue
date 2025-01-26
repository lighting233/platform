<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echart from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echart.registerMap('china', ChinaJSON as any)

interface Iprops {
  option: EChartsOption
}

const props = defineProps<Iprops>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.初始化echart实例 DOM元素；主题；渲染引擎
  const echartInstance = echart.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  // 2.第一次执行setOption（仅会执行一次）
  // echartInstance.setOption(props.option)
  // watchEffect会监听option变化并重新执行
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  // 3.监听windows缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.echart {
  height: 300px;
}
</style>

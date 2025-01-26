<template>
  <div class="doshboard">
    <!-- 1.顶部数字数据展示 -->
    <el-row :gutter="20">
      <template v-for="item in amountList" :key="item.amount">
        <!-- xs 窗口尺寸小于768px时，一行只显示两个 -->
        <el-col :span="6" :xs="12">
          <count-card v-bind="item"></count-card>
        </el-col>
      </template>
    </el-row>

    <!-- 2.中间部分图表 -->
    <el-row :gutter="20">
      <el-col :span="7">
        <chart-card>
          <pie-echart :pie-data="showGoodCategoryCount"></pie-echart>
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <map-echart :map-data="showGoodAddressSale"></map-echart>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <rose-echart :rose-data="showGoodCategoryCount"></rose-echart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分图表 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <chart-card>
          <!-- <line-echart :values="showGoodCategorySale.values" :labels="showGoodCategorySale.labels"></line-echart> -->
          <line-echart v-bind="showGoodCategorySale"></line-echart>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <bar-echart v-bind="showGoodCategoryFavor"></bar-echart>
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import countCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
// import baseEchart from '@/components/page-echarts'
import { PieEchart, LineEchart, RoseEchart, BarEchart, MapEchart } from '@/components/page-echarts'
import { computed } from 'vue'

// 1.请求头部卡片数据
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store中获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 3.处理数据
const showGoodCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({ name: item.name, value: item.goodsCount ?? 0 }))
})
const showGoodCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount ?? 0)
  return { labels, values }
})
const showGoodCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor ?? 0)
  return { labels, values }
})
const showGoodAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>

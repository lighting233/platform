<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span ref="number1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="number2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'
interface IPops {
  amount: string
  title: string
  tips: string
  number1: number
  subtitle: string
  number2: number
}
// 设置默认值
const props = withDefaults(defineProps<IPops>(), {
  title: '商品总销量',
  tips: '商品总销量',
  number1: 509989,
  subtitle: '商品总销量',
  number2: 509989
})

// ref获取元素要在setup函数顶层中定义
const number1Ref = ref<HTMLElement>()
const number2Ref = ref<HTMLElement>()

onMounted(() => {
  // 需在onMounted生命周期中 配合！非空断言 才能获取DOM元素
  // 参数一: 执行动画的DOM元素
  // 参数二: 数字增加到多少
  // 参数三: 传入对象，其它配置项
  const countOption = {
    prefix: props.amount == 'saleroom' ? '￥' : ''
  }
  const countup1 = new CountUp(number1Ref.value!, props.number1, countOption)
  const countup2 = new CountUp(number2Ref.value!, props.number2, countOption)
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>

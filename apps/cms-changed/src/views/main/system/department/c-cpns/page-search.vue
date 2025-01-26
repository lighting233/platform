<template>
  <div class="search">
    <el-form :model="searchForm" ref="searchFormRef" size="large" label-width="80px">
      <!-- el-row一行沾满后会自动换行 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name"
            ><el-input v-model="searchForm.name" placeholder="请输入查询的部门名称"
          /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader"
            ><el-input placeholder="请输入查询的部门领导" v-model="searchForm.leader"
          /></el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          /></el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <!-- icon属性 Search -->
      <el-button size="large" icon="RefreshRight" @click="handleResetClick">重置</el-button>
      <el-button size="large" type="primary" icon="Search" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const searchFormRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 重置
function handleResetClick() {
  // 1.可能无值
  // 2.利用resetFields重置，需要明确每一个el-form-item绑定的属性
  searchFormRef.value?.resetFields()
  // 重新发送网络请求
  emits('resetClick')
}

// 自定义事件传递数据
const emits = defineEmits(['queryClick', 'resetClick'])
function handleQueryClick() {
  emits('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>

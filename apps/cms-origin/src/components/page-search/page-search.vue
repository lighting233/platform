<template>
  <div class="search" v-if="isQuery">
    <!-- searchConfig（props中数据）可以直接使用 -->
    <el-form :model="searchForm" ref="searchFormRef" size="large" :label-width="searchConfig.labelWidth ?? '80px'">
      <!-- el-row一行沾满后会自动换行 -->
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type == 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-if="item.type == 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
// import searchConfig from '@/views/main/system/department/config/search.config'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import getPermission from '@/hooks/usePermissions'

// 定义自定义事件/接收的属性
interface Iprop {
  searchConfig: {
    pageName: string
    labelWidth: string
    formItem: any[]
  }
}
const props = defineProps<Iprop>()

// 0.获取是否有对应的增删改查的权限
const { isQuery } = getPermission(props.searchConfig.pageName)

// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItem) {
  // initialValue默认值
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置
const searchFormRef = ref<InstanceType<typeof ElForm>>() // 要放在setup顶层作用域内，不然template中访问不到
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

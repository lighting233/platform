<template>
  <div class="content">
    <ul>
      <li v-for="user in categoryList" :key="user.id">
        {{ user.id }}
      </li>
    </ul>
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table v-loading="loading" :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55px" />
        <el-table-column align="center" type="index" label="序号" width="66px" />
        <el-table-column align="center" prop="name" label="用户名" width="150px" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="150px" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="150px" />
        <el-table-column align="center" prop="enable" label="状态" width="100px">
          <!-- 作用域插槽，scope是自定义的名字，可用任意字符代替；plain属性：镂空 -->
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain>{{
              scope.row.enable ? '启用' : '禁用'
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button text type="primary" icon="Edit" size="small" @click="editclick(scope.row)">编辑</el-button>
            <el-button text type="danger" icon="Delete" size="small" @click="deleteClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref, computed } from 'vue'
import { postPageListData } from '@/service/main/system/system'
import { getGoodsCategoryCount } from '@/service/main/analysis/analysis'
import { createPageListQuery, createCategoryQuery } from './query'

// 创建具体的查询实例
const useUserListQuery = createPageListQuery(postPageListData)
const useCategoryQuery = createCategoryQuery(getGoodsCategoryCount)

// 使用查询
const {
  currentPage,
  pageSize,
  list: userList,
  totalCount: userTotalCount,
  loading,
  setPageName,
  updatePagination,
  updateSearchParams,
  reset
} = useUserListQuery()

// 设置页面名称
setPageName('user-list', 'users')

// 使用分类数据
const { list: categoryList } = useCategoryQuery()

console.log(11111111,categoryList.value)

// 分页处理函数
function handleSizeChange() {
  console.log('555555555555555')
  updatePagination({
    currentPage: currentPage.value,
    pageSize: pageSize.value
  })
}

function handleCurrentChange() {
  console.log('66666666666666')
  updatePagination({
    currentPage: currentPage.value,
    pageSize: pageSize.value
  })
}

// 搜索处理函数
function fetchUserListData(searchForm: any = {}) {
  updateSearchParams(searchForm)
}

defineExpose({ fetchUserListData })
const emits = defineEmits(['newUserClick', 'editClick'])

function handleNewUserClick() {
  emits('newUserClick')
}

function editclick(itemData: any) {
  emits('editClick', itemData)
}
function deleteClick(id: number) {
  systemStore.deleteUserAction(id)
}
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>

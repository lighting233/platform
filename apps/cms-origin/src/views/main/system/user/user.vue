<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick"></user-search>
    <user-content ref="userContentRef" @new-user-click="handleNewUserClick" @edit-click="handleEditClick">
    </user-content>
    <user-modal ref="userModalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'

import { ref } from 'vue'

// 搜索界面：查询和重置功能
// 获取userContent组件实例，调用其方法（需暴露）
const userContentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchForm: any) {
  userContentRef.value?.fetchUserListData(searchForm)
}
function handleResetClick() {
  userContentRef.value?.fetchUserListData()
}

// 新建用户弹窗
const userModalRef = ref<InstanceType<typeof userModal>>()
function handleNewUserClick() {
  userModalRef.value?.showDialog()
}
function handleEditClick(itemData: any) {
  userModalRef.value?.showDialog(false, itemData)
}
</script>

<style lang="less" scoped></style>

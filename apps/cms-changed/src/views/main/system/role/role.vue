<template>
  <div class="role">
    <ul>
      <li v-for="user in list" :key="user.id">
        {{ user.id }}
      </li>
    </ul>
    <page-search :search-config="searchConfig" @query-click="handleQueryClick"
      @reset-click="handleResetClick"></page-search>
    <page-content :content-config="contentConfig" ref="pageContentRef" @create-click="handleCreateClick"
      @edit-click="handleEditClick"></page-content>
    <page-modal :modal-config="modalConfig" :other-form="otherForm" ref="pageModalRef">
      <template #menuList>
        <el-tree ref="ElTreeRef" :data="entireMenus" show-checkbox node-key="id" highlight-current
          :props="{ children: 'children', label: 'name' }" @check="handleElTreeCheck" />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/uaePageModal'
import useMainStore from '@/store/main/main'

import { mapMenuToIds } from '@/utils/map-menus'
import { useQueryCache } from '@pinia/colada'
import { createCategoryQuery } from '../user/c-cpns/query'
import { getGoodsCategoryCount } from '@/service/main/analysis/analysis'
// 点击search，content的操作
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击content，modal的操作
const { pageModalRef, handleCreateClick, handleEditClick } = usePageModal(editCallBack)
const queryCache = useQueryCache()
const useCategoryQuery = createCategoryQuery(getGoodsCategoryCount)
console.log('const queryCache = useQueryCache()', queryCache.getQueryData(['get-category', { type: 'aaa' }]))
const { list } = useCategoryQuery();

console.log(22222222222, list.value)
// 定义传递给子组件 新增和编辑时 选中的菜单id数组
const otherForm = ref({})
// 获取完整的菜单列表(storeToRefs保持响应式)
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // menuList: menuList ==>   menuList: [1, 3, 5]
  otherForm.value = { menuList }
}
// 利用回调函数从封装的hooks中拿到想要的数据（父组件函数传入hook，想要的数据传入函数）
const ElTreeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(itemData: any) {
  // proxy对象利用结构变成普通的对象
  // console.log({ ...itemData })
  // 利用 setCheckedKeys 方法设置当前勾选的节点，需结合nextTick使用
  nextTick(() => {
    const menuIds = mapMenuToIds(itemData.menuList)
    ElTreeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>

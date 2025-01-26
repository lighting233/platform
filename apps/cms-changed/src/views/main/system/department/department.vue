<template>
  <div class="department">
    <page-search
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
      :search-config="searchConfig"
    ></page-search>
    <page-content-colada
      ref="pageContentRef"
      @create-click="handleCreateClick"
      @edit-click="handleEditClick"
      :content-config="contentConfig"
      :actions="actions"
    >
      <template #leader="scope">
        <span class="leader">{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content-colada>
    <page-modal ref="pageModalRef" :modal-config="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import { PageContentColada }  from '@kiralight/utils'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { postPageList, deletePage } from '@/service/main/system/system'

import { computed } from 'vue'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/uaePageModal'

const actions = {
  postPageListData: postPageList,
  deleteItem: deletePage
}
// 对 modalConfig 进行操作
const modalConfigRef = computed(() => {
  // 获取部门和角色信息
  const mainStore = useMainStore()
  // // 从store中拿数据为保持响应式，运用storeToRefs函数
  // const { entireDepartments } = storeToRefs(mainStore)
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop == 'parentId' && item.options) {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

// setup相同逻辑抽取：hooks
// 点击search，content的操作
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
// 点击content，modal的操作
const { pageModalRef, handleCreateClick, handleEditClick } = usePageModal()
</script>

<style scoped lang="less">
.leader {
  color: red;
}
.parent {
  color: skyblue;
}
</style>

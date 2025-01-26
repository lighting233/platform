import { ref } from 'vue'
import type pageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  // 搜索界面：查询和重置功能
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  function handleQueryClick(searchForm: any) {
    pageContentRef.value?.fetchPageListData(searchForm)
  }
  function handleResetClick() {
    pageContentRef.value?.fetchPageListData()
  }

  return {
    pageContentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent

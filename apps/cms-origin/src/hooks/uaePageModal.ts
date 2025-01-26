import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void

function usePageModal(editCallBack?: EditFnType) {
  // 新增、编辑
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  function handleCreateClick() {
    pageModalRef.value?.showDialog()
  }
  function handleEditClick(itemData: any) {
    pageModalRef.value?.showDialog(false, itemData)
    // 类型缩小
    if (editCallBack) editCallBack(itemData)
  }
  return {
    pageModalRef,
    handleCreateClick,
    handleEditClick
  }
}

export default usePageModal

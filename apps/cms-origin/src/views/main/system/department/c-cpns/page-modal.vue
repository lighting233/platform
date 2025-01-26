<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建部门' : '编辑部门'" width="30%" center>
      <el-form :model="formData" size="large" label-width="80px" ref="newUserFormRef">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" size="large" placeholder="请选择上级部门" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 新建 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import type { ElForm } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

const centerDialogVisible = ref(false)
// 新建用户填入信息
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 获取部门和角色信息
const mainStore = useMainStore()
const systemStore = useSystemStore()
// 从store中拿数据为保持响应式，运用storeToRefs函数
const { entireDepartments } = storeToRefs(mainStore)

const isNewRef = ref(true) // 是否有密码这一项
// const newUserFormRef = ref<InstanceType<typeof ElForm>>()
const editDepartmentId = ref<number>(0) // 记录当前编辑用户ID
// 定义方法，对操作做限制
function showDialog(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
      editDepartmentId.value = itemData.id
    }
  } else {
    // newUserFormRef.value?.resetFields()
    for (const key in formData) {
      formData[key] = ''
    }
  }
}
defineExpose({ showDialog })

// 新建用户
function handleConfirmClick() {
  centerDialogVisible.value = false
  if (isNewRef.value) {
    systemStore.createPageAction('department', formData)
  } else {
    systemStore.editPageAction('department', editDepartmentId.value, formData)
  }
}
</script>

<style lang="less" scoped>
.el-form {
  padding: 0 20px;
}
</style>

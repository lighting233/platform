<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <el-form :model="newUserForm" size="large" label-width="80px" ref="newUserFormRef">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="newUserForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="newUserForm.realname" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isNewRef">
          <el-input v-model="newUserForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="newUserForm.cellphone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="newUserForm.roleId" size="large" placeholder="请选择角色" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <!-- 对el-option而言，label选中后展示的内容，value是绑定的值（存储传递） -->
              <el-option :value="item.id" :label="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="newUserForm.departmentId" size="large" placeholder="请选择部门" style="width: 100%">
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
const newUserForm = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 获取部门和角色信息
const mainStore = useMainStore()
const systemStore = useSystemStore()
// 从store中拿数据为保持响应式，运用storeToRefs函数
const { entireDepartments, entireRoles } = storeToRefs(mainStore)

const isNewRef = ref(true) // 是否有密码这一项
// const newUserFormRef = ref<InstanceType<typeof ElForm>>()
const editUserId = ref<number>(0) // 记录当前编辑用户ID
// 定义方法，对操作做限制
function showDialog(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in newUserForm) {
      newUserForm[key] = itemData[key]
      editUserId.value = itemData.id
    }
  } else {
    // newUserFormRef.value?.resetFields()
    for (const key in newUserForm) {
      newUserForm[key] = ''
    }
  }
}
defineExpose({ showDialog })

// 新建用户
function handleConfirmClick() {
  centerDialogVisible.value = false
  if (isNewRef.value) {
    systemStore.createUserAction(newUserForm)
  } else {
    systemStore.editUserAction(editUserId.value, newUserForm)
  }
}
</script>

<style lang="less" scoped>
.el-form {
  padding: 0 20px;
}
</style>

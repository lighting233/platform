<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? modalConfig.header.createTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <el-form :model="formData" size="large" label-width="80px" ref="newUserFormRef">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type == 'input'">
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
            </template>
            <template v-if="item.type == 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
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
import useSystemStore from '@/store/main/system/system'
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

// import type { IModalConfig } from './type'
interface IModalConfig {
  modalConfig: {
    pageName: string
    header: {
      createTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherForm?: any
}

const props = defineProps<IModalConfig>()

const centerDialogVisible = ref(false)
// 新建用户填入信息

const initialData: any = {}
props.modalConfig.formItems.forEach((element) => {
  initialData[element.prop] = element.initialValue ?? ''
})
const formData = reactive<any>(initialData) // 弹窗组件隐藏时设置初始值不会生效，可在下方新建数据时设置

const systemStore = useSystemStore()

const isNewRef = ref(true) // 是否有密码这一项
// const newUserFormRef = ref<InstanceType<typeof ElForm>>()
const editDepartmentId = ref<number>(0) // 记录当前编辑用户ID
// 定义方法，对操作做限制
function showDialog(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
      editDepartmentId.value = itemData.id
    }
  } else {
    // 新建数据
    // newUserFormRef.value?.resetFields()
    for (const key in formData) {
      // 最好像编辑时，设置选中节点传入空数组⭐
      const item = props.modalConfig.formItems.find((item) => item.prop == key)
      formData[key] = item ? item.initialValue : ''
      // formData[key] = ''
    }
  }
}
defineExpose({ showDialog })

// 新建用户
function handleConfirmClick() {
  centerDialogVisible.value = false

  let infoData = formData
  if (props.otherForm) {
    infoData = { ...props.otherForm, ...infoData }
  }

  if (isNewRef.value) {
    // 新建
    systemStore.createPageAction(props.modalConfig.pageName, infoData)
  } else {
    systemStore.editPageAction(props.modalConfig.pageName, editDepartmentId.value, infoData)
  }
}
</script>

<style lang="less" scoped>
.el-form {
  padding: 0 20px;
}
</style>

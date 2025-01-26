<template>
  <div class="pane-account">
    <!-- size 控制表单所有子组件尺寸；:rules 绑定校验规则 -->
    <el-form label-width="60" size="large" :model="account" :rules="rules" status-icon ref="formRef">
      <!-- prop 指明校验规则对应的item -->
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- show-password 属性，隐藏密码 -->
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 定义校验规则
const rules: FormRules = {
  name: [
    { required: true, message: '必须输入账号', trigger: 'blur' },
    // { min: 3, max: 10, message: '长度必须为3~10位', trigger: 'blur' }
    // 正则表达式写法
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '必须为以数字或字母开头且长度为3~10位',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '必须为以数字或字母开头且长度大于3', trigger: 'blur' }
  ]
}

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRememberPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入帐号和密码
      const name = account.name
      const password = account.password

      // 2.在store action 中向服务器发送网络请求
      loginStore.accountLoginRequest({ name, password }).then(() => {
        // 3.判断是否需要记住账号和密码
        if (isRememberPassword) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      // 需引入样式后才能正常使用
      ElMessage.error('请输入正确的账号密码后再点击登录')
    }
  })
}
// 父组件调用子组件方法，子组件中需暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>

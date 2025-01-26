<template>
  <div class="login-panel">
    <!-- 标题 -->
    <h1 class="title">神木后台管理系统</h1>
    <div class="tabs">
      <!-- type：风格；stretch标签宽度是否可以撑开 :stretch="true" == stretch -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登录" name="account">
          <!-- <template v-slot="label"> -->
          <!-- v-solt语法糖 -->
          <!-- 会对label属性进行覆盖 -->
          <template #label>
            <div class="label">
              <!-- el-icon是为了方便设置样式 -->
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRememberPassword" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 有属性就有属性，没有就覆盖，新增一个类，中height用自定义变量表示，理论 全局:root{}内可对变量覆盖更新 -->
    <!-- 此处是组件类单独设置的自定义变量，故不会被覆盖。可在组件内定义更新 -->
    <el-button type="primary" class="login-btn" size="large" @click="handleLoginBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import PaneAccount from './pane-account.vue' // 不是类型，是一个对象（类，在template中相当于创建一个一个的实例）
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

// 不初始化值传入泛型，默认不绑定
// const activeName = ref<string>()
const activeName = ref('account') // 默认绑定，账号登录
const isRememberPassword = ref<boolean>(localCache.getCache('isRememberPassword') ?? false) // 是否记住密码
// 对是否记住密码状态进行存储
watch(isRememberPassword, (newVal) => {
  localCache.setCache('isRememberPassword', newVal)
})
// typeof PaneAccount 拿到一个构造器，InstanceType要求传入一个构造器，获取返回值类型
const accountRef = ref<InstanceType<typeof PaneAccount>>() // 通过ref获取子组件实例（对象创建出来的实例对象）

function handleLoginBtnClick() {
  if (activeName.value == 'account') {
    // 可选链  参数：是否记住密码
    accountRef.value?.loginAction(isRememberPassword.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 10px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>

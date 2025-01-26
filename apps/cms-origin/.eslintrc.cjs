/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 继承一些规范，但是不能保证与prettierrc保存时规范一致
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // 配置检测代码时与prettierrc保持一致
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // 自定义规则，可覆盖
  rules: {
    // '@vue/eslint-config-typescript': 'off'
    // 消除组件命名必须hy-login格式校验
    'vue/multi-word-component-names': 'off',
    // 打开debugger功能
    'no-debugger': 'off',
    'no-undef': 'off'
  }
}

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: 'off', //让其关闭对于引号验证
    'space-before-function-paren': 'off', //对于关键字前面空格验证
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // 组件名字不需要驼峰命名
    'no-undef': 'off',
    camelcase: 'off',
    '@typescript-eslist/camelcase': 0
    // 'prettier/prettier': 'off'
  }
}

import { createApp } from 'vue'
import App from './App.vue'
// vue-router
import router from '@/router'
// vuex
import store from '@/store'
// 引入element-plus的默认的css样式文件
// import 'element-plus/dist/index.css'
// 引入重置样式
import 'normalize.css'
// vant组件
import { Icon } from 'vant'
import 'vant/lib/index.css'

// iconfont
import '@/assets/iconfont/iconfont.css'
// 移动端适配插件
import 'lib-flexible/flexible'
// 滑块验证码
createApp(App).use(router).use(store).use(Icon).mount('#app')

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
createApp(App).use(router).use(store).mount('#app')

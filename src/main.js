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
import { Icon, Swipe, SwipeItem, Toast } from 'vant'
import 'vant/lib/index.css'
import 'vant/es/toast/style'
// iconfont
import '@/assets/iconfont/iconfont.css'
// 移动端适配插件
import 'lib-flexible/flexible'

// vant按需引入
import { Checkbox, CheckboxGroup } from 'vant'
import { Stepper, Card, Button, SwipeCell, SubmitBar, Popup } from 'vant'
createApp(App)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Card)
  .use(Popup)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(Button)
  .use(Stepper)
  .use(router)
  .use(store)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .mount('#app')

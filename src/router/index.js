import { createRouter, createWebHashHistory } from 'vue-router'
export const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  // 登录、注册
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  // 分类
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/CategoryView.vue')
  },
  //搜索页面
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue')
  },
  //商品列表
  {
    path: '/cates/:id',
    name: 'cates',
    component: () => import('@/views/CateContView.vue')
  },
  // 购物车
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartView.vue')
  },
  // 我的
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/UserView.vue')
  },
  // 订单
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/OrderView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrdersView.vue')
    // 账户管理
  },
  // 地址
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/AddressView.vue')
  },
  {
    path: '/addresslist/:id',
    name: 'addresslist',
    component: () => import('@/views/AddressListView.vue')
  },
  // 账户管理
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/SettingView.vue')
  },
  // 商品细节
  {
    path: '/good/:id',
    name: 'good',
    component: () => import('@/views/GoodDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加前置路由守卫拦截登录
const isLogin = () => {
  return !!localStorage.getItem('token') // 如果token不存在或者token=''|undefined|false ---> false
}

router.beforeEach((to) => {
  if (to.name === 'login') {
    if (isLogin()) {
      ElMessage('登录状态有效，不需要重复登录了')
      return { name: 'home' }
    }
  } else if (to.name === 'home') {
    if (!isLogin()) {
      // 如果用户登录了，清空了token，需要回到登录页面了
      return { name: 'login' }
    }
  }
})

export default router

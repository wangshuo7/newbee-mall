import axios from 'axios'
import router from '@/router'
import { Toast } from 'vant'
import 'vant/es/toast/style'
// 给axios设置一些默认行为
switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://backend-api-01.newbee.ltd'
    break
  case 'development':
    axios.defaults.baseURL = 'http://backend-api-01.newbee.ltd'
    break
}

// 设置超时时间
axios.defaults.timeout = 5000
// 设置跨域是否需要携带凭证
axios.defaults.withCredentials = false

// 设置请求之前的拦截器
axios.interceptors.request.use((config) => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true
  // })
  // 后端返回token令牌，前端需要将token存入本地存储
  let token = localStorage.getItem('token')
  token && (config.headers.token = token)
  return config
})

// 设置响应之后的拦截器
axios.interceptors.response.use((response) => {
  if (response.data?.data?.token) {
    localStorage.setItem('token', response.data.data.token)
  }

  // 全局的弹窗
  // Toast.clear()
  response?.data?.resultCode === 200 ? '' : Toast.fail(response?.data?.message)

  // token过期
  if (response.data?.resultCode === 416) {
    localStorage.removeItem('token')
    router.push('/login')
  }
  return response.data
})

export default axios

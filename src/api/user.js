import request from '@/service'
// 登录
export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}
// 注册
export function register(data) {
  return request({
    url: '/api/v1/user/register',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/v1/user/info',
    method: 'get'
  })
}

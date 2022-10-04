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

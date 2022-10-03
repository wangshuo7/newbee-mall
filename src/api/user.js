import request from '@/service'
export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

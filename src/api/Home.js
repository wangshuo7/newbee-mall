import request from '@/service'

export function getHomeData(data) {
  return request({
    url: '/api/v1/index-infos',
    method: 'get',
    params: {
      ...data
    }
  })
}

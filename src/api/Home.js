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

// search 数据
export function getSearchData(data) {
  return request({
    url: '/api/v1/search',
    method: 'get',
    params: {
      ...data
    }
  })
}

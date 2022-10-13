import request from '@/service'

export function getOrderData(data) {
  return request({
    url: '/api/v1/order',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function getOrderDetailData(data) {
  return request({
    url: `/api/v1/order/${data}`,
    method: 'get'
  })
}

export function paySuccess(data) {
  return request({
    url: '/api/v1/paySuccess',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function canclePay(data) {
  return request({
    url: `/api/v1/order/${data}/cancel`,
    method: 'put',
  })
}

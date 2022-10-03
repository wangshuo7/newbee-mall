import request from '@/service'

// 鼓舞车列表接口
export function getShopCart() {
  return request({
    url: '/api/v1/shop-cart',
    method: 'get'
  })
}

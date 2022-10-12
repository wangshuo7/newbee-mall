import request from '@/service'

// 购物车列表接口
export function getShopCart() {
  return request({
    url: '/api/v1/shop-cart',
    method: 'get'
  })
}

// 修改购物车列表接口
export function putShopCart(data) {
  return request({
    url: '/api/v1/shop-cart',
    method: 'put',
    data
  })
}
// 删除购物车列表数据接口
export function deleteShopCart(data) {
  return request({
    url: `/api/v1/shop-cart/${data}`,
    method: 'delete'
  })
}

// 购物车订单列表接口
export function getShopCartOrders(data) {
  return request({
    url: '/api/v1/shop-cart/settle',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 模拟支付成功回调的接口
export function paySuccess(data) {
  return request({
    url: '/api/v1/paySuccess',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 生成订单地址接口
export function getAddressDefault() {
  return request({
    url: '/api/v1/address/default',
    method: 'get'
  })
}

// 点击生成订单接口
export function postsaveOrder(data) {
  return request({
    url: '/api/v1/saveOrder',
    method: 'post',
    data
  })
}

// 添加购物车
export function addCart(data) {
  return request({
    url: '/api/v1/shop-cart',
    method: 'post',
    data
  })
}

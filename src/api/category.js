import axios1 from '@/service'
//请求分类数据
export function getcategoryList() {
  return axios1({
    url: '/api/v1/categories',
    method: 'get'
  })
}
//商品相关接口

export function getcategorys(data) {
  return axios1({
    url: '/api/v1/goods/detail/' + data,

    method: 'get'
  })
}
//首页
export function getindex() {
  return axios1({
    url: '/api/v1/index-infos',

    method: 'get'
  })
}
//注册
export function tologin(data) {
  return axios1({
    url: '/api/v1/user/login',
    method: 'post',

    data
  })
}

//登录
export function toregister(data) {
  return axios1({
    url: '/api/v1/user/register',
    method: 'post',

    data
  })
}
//添加商品到购物车接口
export function topush(data) {
  return axios1({
    url: '/api/v1/shop-cart',
    method: 'post',

    data
  })
}
//搜索接口
export function tosearch(data) {
  return axios1({
    url: '/api/v1/search',
    method: 'get',
    params: { ...data }
  })
}

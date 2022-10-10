import request from '../service/index.js'
// import axios from 'axios'

// export function getAddressList() {
//   return axios.get('/address', { pageNumber: 1, pageSize: 1000 })
// }
// export function addAddress(params) {
//   return axios.post('/address', params)
// }
export function addAddressList(data) {
  return request({
    url: '/api/v1/address',
    method: 'post',
    data
  })
}
export function myAddressList(data) {
  return request({
    url: '/api/v1/address',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function getAddressList(data) {
  return request({
    url: '/api/v1/address/' + data,
    method: 'get'
  })
}

export function aditAddressList(data) {
  return request({
    url: '/api/v1/address',
    method: 'put',
    data
  })
}

export function deleteAddressList(data) {
  return request({
    url: '/api/v1/address/' + data,
    method: 'delete'
  })
}
export function defaultAddressList() {
  return request({
    url: '/api/v1/address/default',
    method: 'get'
  })
}

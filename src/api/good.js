import request from '@/service'

// 获取商品细节
export function getDetail(id) {
    return request({
        url: `/api/v1/goods/detail/${id}`,
        method: 'get',
    })
}




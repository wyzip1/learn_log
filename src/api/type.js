import request from './util'

export function getType(normal = true) {
    let url = normal ? '/type/list' : '/type/notloglist'
    return request({
        url,
        type: 'GET'
    })
}

export function addType(params) {
    return request({
        url: '/type/add',
        type: 'POST',
        params
    })
}

export function delType(params) {
    return request({
        url: '/type/del',
        type: 'DELETE',
        params
    })
}
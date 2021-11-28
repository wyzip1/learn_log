import request from '../config/axios-options'

export function getType() {
    let url = '/type/list'
    return request({
        url,
        method: 'GET'
    })
}

export function addType(data) {
    return request({
        url: '/type/add',
        method: 'POST',
        data
    })
}

export function delType(params) {
    return request({
        url: '/type/del',
        method: 'DELETE',
        params
    })
}
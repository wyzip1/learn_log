import request from './util'

export function getType() {
    return request({
        url: '/type/list',
        type: 'GET'
    })
}
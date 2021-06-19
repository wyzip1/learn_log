import request from './util'

export function doLoign(params) {
    return request({
        url: '/login',
        type: 'POST',
        params
    })
}
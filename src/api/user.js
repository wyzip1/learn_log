import request from '../config/axios-options'

export function doLoign(data) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}

export function register(data) {
    return request({
        url: '/register',
        method: 'POST',
        data
    });
}
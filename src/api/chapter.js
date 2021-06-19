import request from './util'

export function addChapter(params) {
    return request({
        url: '/chapter/add',
        type: 'POST',
        params
    })
}

export function getChapterList(params) {
    return request({
        url: '/chapter/list',
        type: 'GET',
        params
    })
}

export function getChapterDetail(id) {
    return request({
        url: '/content/detail/' + id,
        type: 'GET'
    })
}
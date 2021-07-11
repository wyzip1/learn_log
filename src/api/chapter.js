import request from './util'

export function delChapter(params) {
    return request({
        url: '/chapter/del',
        type: 'DELETE',
        params
    })
}

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

export function getLogList(params) {
    return request({
        url: '/chapter/log',
        type: 'GET',
        params
    })
}

export function getChapterInfo(id) {
    return request({
        url: '/chapter/chapterInfo?chapterId=' + id,
        type: 'GET'
    })
}

export function getChapterDetail(id) {
    return request({
        url: '/content/detail/' + id,
        type: 'GET'
    })
}
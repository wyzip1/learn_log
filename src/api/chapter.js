import request from '../config/axios-options'

export function delChapter(params) {
    return request({
        url: '/chapter/del',
        method: 'DELETE',
        params
    })
}

export function addChapter(data) {
    return request({
        url: '/chapter/add',
        method: 'POST',
        data
    })
}

export function getChapterList(params) {
    return request({
        url: '/chapter/list',
        method: 'GET',
        params
    })
}

export function getRandomList(params) {
    return request({
        url: '/chapter/random',
        method: 'GET',
        params
    });
}

export function getLogList(params) {
    return request({
        url: '/chapter/log',
        method: 'GET',
        params
    })
}

export function getChapterInfo(id) {
    return request({
        url: '/chapter/chapterInfo?chapterId=' + id,
        method: 'GET'
    })
}

export function getChapterDetail(id) {
    return request({
        url: '/content/detail/' + id,
        method: 'GET'
    })
}

export function updateChapter(data) {
    return request({
        url: '/chapter/update',
        method: 'PUT',
        data
    });
}
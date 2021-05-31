import service from '@/utils/request';

/**
 * 获取信息列表
 */
export function getNewsList(data){
    return Fservice.request({
        method: 'post',
        url: '/news/getList/',
        data
    })
}
/**
 * 添加信息
 */
 export function addNews(data){
    return service.request({
        method: 'post',
        url: '/news/add/',
        data
    })
}
/**
 * 删除信息
 */
 export function deleteNews(data){
    return service.request({
        method: 'post',
        url: '/news/deleteInfo/',
        data
    })
}
/**
 * 修改信息
 */
 export function editNews(data){
    return service.request({
        method: 'post',
        url: '/news/editInfo/',
        data
    })
}
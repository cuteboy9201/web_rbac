/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-08-30 10:59:22
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'
export function getInterface(id) {
    return request({
        url: '/rbac/interface/' + id + '/',
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getInterfacePagedList(query) {
    return request({
        url: '/rbac/interface/',
        method: 'get',
        params: query
    })
}
export function saveInterface(data) {
    return request({
        url: '/rbac/interface/',
        method: 'post',
        data: data,
        success: {
            type: 'message',
            options: {
                message: '保存成功',
                type: 'success'
            }
        }
    })
}

export function delInterface(id) {
    return request({
        url: '/rbac/interface/' + id + '/',
        method: 'delete',
        params: { id: id },
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}

export function delInterfaces(ids) {
    return request({
        url: '/rbac/interface/',
        method: 'delete',
        params: ids,
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}
export function relateInterface(data) {
    return request({
        url: '/rbac/interface/relate/',
        method: 'post',
        data: data
    })
}
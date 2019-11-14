/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-14 15:42:51
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'

export function getMenuList() {
    return request({
        url: '/rbac/menu',
        method: 'get',
        interfaceCheck: true,
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        }
    })
}

export function getMenu(id) {
    return request({
        url: '/rbac/menu/' + id,
        method: 'get',
        interfaceCheck: true,
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}

export function saveMenu(data) {
    return request({
        url: '/rbac/menu',
        method: 'post',
        interfaceCheck: true,
        data,
        loading: {
            type: 'nprogress',
            interval: 1000
        },
        success: {
            type: 'message',
            options: {
                message: '保存成功',
                type: 'success'
            }
        }
    })
}
export function delMenu(id) {
    return request({
        url: '/rbac/menu/' + id,
        interfaceCheck: true,
        method: 'delete',
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}

export function getMenuType1() {
    return request({
        url: '/rbac/menu/1/',
        method: 'get',
        interfaceCheck: true,
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
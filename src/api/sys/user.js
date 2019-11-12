/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-09-04 16:19:57
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'
export function getUser(id) {
    return request({
        url: '/rbac/user/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}
export function getUserPermissionInfo() {
    return request({
        url: '/rbac/user/info',
        method: 'get'
    })
}
export function getUserPagedList(query) {
    return request({
        url: '/rbac/user/pagedlist',
        method: 'get',
        params: query
    })
}
export function editRoleUser(data) {
    return request({
        url: '/rbac/user/editrole/',
        method: 'post',
        data: data
    })
}
export function saveUser(data) {
    return request({
        url: '/rbac/user/save',
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

export function changePassword(data) {
    return request({
        url: '/rbac/user/changepassword',
        method: "post", 
        data: data,
        success: {
            type: 'message',
            options: {
                message: "修改成功",
                type: 'success'
            }
        }
    })
}

export function adminChangePassword(data) {
    return request({
        url: '/rbac/user/adminchangepassword',
        method: "post", 
        data: data,
        success: {
            type: 'message',
            options: {
                message: "修改成功",
                type: 'success'
            }
        }
    })
}

export function delUser(id) {
    return request({
        url: '/rbac/user/del',
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
export function delUsers(ids) {
    return request({
        url: '/rbac/user/batchdel',
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
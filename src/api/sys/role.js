/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-14 16:15:59
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'
export function getRole (id) {
  return request({
    url: '/rbac/role/' + id,
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function getRolePagedList (query) {
  return request({
    url: '/rbac/role/',
    method: 'get',
    params: query,
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function delRole (id) {
  return request({
    url: '/rbac/role/',
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
export function delRoles (ids) {
  return request({
    url: '/rbac/role/batchdel',
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
export function saveRole (data) {
  return request({
    url: '/rbac/role/',
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
export function getRolePermissions (roleId) {
  return request({
    url: '/rbac/role/permissions/' + roleId,
    method: 'get',
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
export function savePermission (data) {
  return request({
    url: '/rbac/role/savepermission/',
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

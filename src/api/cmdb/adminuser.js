/*
 * @Author: your name
 * @Date: 2019-11-20 14:07:58
 * @LastEditTime: 2019-11-21 15:00:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/api/cmdb/adminuser.js
 */
import request from '@/plugin/axios'

export function getAdminUserPageList (data) {
  return request({
    url: '/cmdb/adminuser/',
    method: 'get',
    params: data
  })
}

export function delids (data) {
  return request({
    url: '/cmdb/adminuser/',
    method: 'delete',
    data: data
  })
}

export function del (id) {
  return request({
    url: '/cmdb/adminuser/' + id,
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

export function getInfoById (id) {
  return request({
    url: '/cmdb/adminuser' + id,
    method: 'get'
  })
}

export function save (data) {
  return request({
    url: '/cmdb/adminuser/',
    method: 'post',
    data: data,
    success: {
      tyep: 'message',
      options: {
        message: '保存成功',
        type: 'success'
      }
    }
  })
}

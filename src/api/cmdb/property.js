/*
 * @Author: your name
 * @Date: 2019-11-19 14:37:12
 * @LastEditTime: 2019-11-27 16:46:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/api/cmdb/property.js
 */
import request from '@/plugin/axios'

export function getPageInfo (query) {
  return request({
    url: '/cmdb/property/',
    method: 'get',
    params: query
  })
}

export function del (id) {
  return request({
    url: '/cmdb/property/' + id,
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

export function delids (data) {
  return request({
    url: '/cmdb/property/',
    method: 'delete',
    data: data
  })
}

export function getInfoById (id) {
  return request({
    url: '/cmdb/property/' + id,
    method: 'get'
  })
}

export function save (data) {
  return request({
    url: '/cmdb/property/',
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

export function getSelect () {
  return request({
    url: '/cmdb/auth/select',
    method: 'get'
  })
}

export function put (data) {
  return request({
    url: '/cmdb/property/' + data.id,
    method: 'put',
    data: data
  })
}
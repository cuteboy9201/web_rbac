/*
 * @Author: YouShumin
 * @Date: 2019-12-26 11:24:49
 * @LastEditTime : 2020-01-13 14:40:06
 * @LastEditors  : YouShumin
 * @Description: 
 * @FilePath: /web_rbac/src/api/cmdb/userright.js
 */
import request from '@/plugin/axios'

export function getHostSelect() {
  return request({
    url: '/cmdb/select/host',
    method: 'get',
  })
}


export function getAuthSelect() {
  return request({
    url: '/cmdb/select/user',
    method: 'get',
  })
}

export function getUserSelect() {
  return request({
    url: '/rbac/select/?msg_id=user',
    method: 'get',
  })
}

export function getRoleSelect() {
  return request({
    url: '/rbac/select/?msg_id=role',
    method: 'get',
  })
}

export function save(data) {
  return request({
    url: '/cmdb/user/right',
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

export function getPage(data) {
  return request({
    url: '/cmdb/user/right',
    method: 'get',
    params: data
  })
}

export function del(id) {
  return request({
    url: '/cmdb/userright/' + id,
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

export function delids(data) {
  return request({
    url: '/cmdb/user/right',
    method: 'delete',
    data: data
  })
}
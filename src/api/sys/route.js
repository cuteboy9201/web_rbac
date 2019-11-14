/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-14 16:10:59
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'

export function getRouteList () {
  return request({
    url: '/rbac/route/',
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function getRoute (id) {
  return request({
    url: '/rbac/route/' + id,
    method: 'get',
    loading: {
      type: 'nprogress',
      interval: 500
    }
  })
}
export function saveRoute (data) {
  return request({
    url: '/rbac/route/',
    method: 'post',
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
export function delRoute (id) {
  return request({
    url: '/rbac/route/' + id,
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

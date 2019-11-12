/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-09-03 12:11:03
 * @LastEditors: Please set LastEditors
 */
import request from '@/plugin/axios'

export function AccountLogin(data) {
  return request({
    url: '/rbac/auth/login',
    method: 'post',
    data,
    loading: {
      type: 'loading',
      options: {
        fullscreen: true,
        lock: true,
        text: '正在登陆...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      }
    }
  })
}

export function AccountCode(num) {
  return request({
    url: '/rbac/captcha/refresh?' + num,
    method: 'get',
  })
}

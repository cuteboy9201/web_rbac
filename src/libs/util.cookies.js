/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-09-09 11:52:52
 * @LastEditors: Please set LastEditors
 */
import Cookies from 'js-cookie'
import setting from '@/setting.js'

const cookies = {}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} setting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 0.125
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`d2admin-${setting.releases.version}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`d2admin-${setting.releases.version}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`d2admin-${setting.releases.version}-${name}`)
}

export default cookies

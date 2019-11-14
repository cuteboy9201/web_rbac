/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-14 15:38:53
 * @LastEditors: Please set LastEditors
 */
import store from '@/store'
import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'
import util from '@/libs/util'
import loading from '@/libs/loading'
import message from '@/libs/message'
import permission from '@/libs/permission'

function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
}

// 记录和显示错误
function errorLog (err) {
  // 添加到日志
  store.dispatch('d2admin/log/add', {
    type: 'error',
    err,
    info: '数据请求异常'
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 1 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5 * 1000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (!permission.access(config, store)) {
      throw {
        type: '403',
        config: config
      }
    }
    loading.show(config)

    // 修改请求接口路径
    // config.url = "/api" + config.url

    // 在请求发送之前做一些处理
    if (!(/^https:\/\/|http:\/\//.test(config.url))) {
      const token = util.cookies.get('token')
      if (token && token !== 'undefined') {
        // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
        config.headers['Authorization'] = 'SuperManager ' + token
      }
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    loading.hide(response.config)
    const res = response.data
    const { statusCode } = res
    const { msg } = res
    if (statusCode === undefined) {
      return res
    } else {
      switch (statusCode) {
        case 200:
          return res.data
        case 500:
          errorCreate(`[code: 500] ${response.config.url}`)
          return Promise.reject(res.msg)
        default:
          errorCreate(`${response.config.url}`)
          return res
      }
    }
  },
  error => {
    loading.hide(error.config)
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
        case 401:
          util.cookies.remove('token')
          util.cookies.remove('uuid')
          if (error.config.url.indexOf('logout') === -1) {
            Message({
              message: '登陆信息已过期,请重新登陆!',
              type: 'error',
              duration: 3 * 1000
            })
          };
          router.push({
            name: 'login'
          })
          break
        case 403: error.message = '拒绝访问'; errorLog(error); break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; errorLog(error); break
        case 408: error.message = '请求超时'; errorLog(error); break
        case 500: error.message = '服务器内部错误'; errorLog(error); break
        case 501: error.message = '服务未实现'; errorLog(error); break
        case 502: error.message = '网关错误'; errorLog(error); break
        case 503: error.message = '服务不可用'; errorLog(error); break
        case 504: error.message = '网关超时'; errorLog(error); break
        case 505: error.message = 'HTTP版本不受支持'; errorLog(error); break
        default: error.message = '网络不可用'; errorLog(error);break
      }
    }
    if(!error.response) {
      error.message = "接口服务不可用"; errorLog(error); 
    }
    return Promise.reject(error)
  }
)

export default service

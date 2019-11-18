/*
 * @Author: your name
 * @Date: 2019-11-12 15:37:59
 * @LastEditTime: 2019-11-18 14:51:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /RBAC/src/i18n/index.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './lang/cn'
// import ja from './lang/ja'
// import en from './lang/en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'cn',
  messages: {
    cn,
    // ja,
    // en
  }
})

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime: 2019-11-26 16:38:15
 * @LastEditors: Please set LastEditors
 */
import layoutHeaderAside from '@/layouts/header-aside'
const files = require.context('./', true, /\.js$/)

let componentMaps = {
  'layoutHeaderAside': layoutHeaderAside,
  'menu': () => import(/* webpackChunkName: "menu" */'@/pages/sys/menu'),
  'route': () => import(/* webpackChunkName: "route" */'@/pages/sys/route'),
  'role': () => import(/* webpackChunkName: "role" */'@/pages/sys/role'),
  'user': () => import(/* webpackChunkName: "user" */'@/pages/sys/user'),
  'interface': () => import(/* webpackChunkName: "interface" */'@/pages/sys/interface'),
  'property_adminuser': () => import(/* webpackChunkName: "property_adminuser" */'@/pages/cmdb/adminuser'),
  'property_index': () => import(/* webpackChunkName: "property_adminuser" */'@/pages/cmdb/property')
}
files.keys().forEach((key) => {
  if (key === './index.js') return
  Object.assign(componentMaps, files(key).default)
})
export default componentMaps

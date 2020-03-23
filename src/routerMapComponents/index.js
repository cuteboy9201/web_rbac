/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 12:02:24
 * @LastEditTime : 2019-12-25 15:25:35
 * @LastEditors  : YouShumin
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
  'property_index': () => import(/* webpackChunkName: "property_adminuser" */'@/pages/cmdb/property'),
  'property_user': () => import(/* webpackChunkName: "property_adminuser" */'@/pages/cmdb/user')
}
files.keys().forEach((key) => {
  if (key === './index.js') return
  Object.assign(componentMaps, files(key).default)
})
export default componentMaps

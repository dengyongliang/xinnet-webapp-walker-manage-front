/* es6-shim,es6-promise ie兼容需要 */
import 'es6-shim'
import Vue from 'vue'
import App from './App'
import router from './router'
import makeStore from './store'
import directives from './directives'
// import $ from 'jquery'
// import axios from 'axios'
import iView from 'iview'
// 自定义方法及变量
import GLOBAL from './global/global'
require('es6-promise').polyfill()

Vue.prototype.GLOBALS = GLOBAL
// Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(directives)

let store = makeStore
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

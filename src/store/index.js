import Vue from 'vue'
import Vuex from 'vuex'
import login from './login.js'
import user from './user.js'
import customer from './customer.js'
import finance from './finance.js'
import order from './order.js'
import worklist from './worklist.js'
import report from './report.js'

Vue.use(Vuex)
export default function makeStore () {
  return new Vuex.Store({
    state: {
      showBodySpin: true,
      maskClosable: false,
      islogin: false
      // pending: true
    },
    mutations: {
      LOGIN_FALSE (state) {
        state.islogin = false
      },
      LOGIN_TRUE (state) {
        state.islogin = true
      },
      HIDE_BODY_SPIN (state, payload) {
        state.showBodySpin = false
      },
      SHOW_BODY_SPIN (state, payload) {
        state.showBodySpin = true
      }
    },
    actions: {
    },
    getters: {
    },
    modules: {
      login,
      user,
      customer,
      finance,
      order,
      report,
      worklist
    }
  })
}

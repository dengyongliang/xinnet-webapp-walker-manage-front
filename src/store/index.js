import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user.js'
import account from './account.js'
import finance from './finance.js'
import order from './order.js'
import service from './service.js'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
Vue.use(Vuex)
export default function makeStore () {
  return new Vuex.Store({
    state: {
      showBodySpin: true,
      maskClosable: false,
      islogin: false,
      pending: true
    },
    mutations: {
      [types.SHOW_BODY_SPIN] (state, payload) {
        state.showBodySpin = false
      }
    },
    actions: {
      [types.LOGIN_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_VERIFICATIONCODE, params.param)
          .then(params.callback)
          .catch()
      },
      [types.LOGIN_SUBMIT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_SUBMIT, params.param)
          .then(params.callback)
          .catch()
      },
      [types.LOGIN_OUT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_OUT, '')
          .then(params.callback)
          .catch()
      }
    },
    getters: {
    },
    modules: {
      user,
      account,
      finance,
      order,
      service
    }
  })
}

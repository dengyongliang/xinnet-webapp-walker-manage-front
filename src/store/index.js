import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user.js'
import account from './account.js'
import finance from './finance.js'
import rest from '../global/rest.js'
import * as links from '../global/linkdo.js'
// import * as links from '../global/linkdo_json.js'
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
      [types.SHOW_BODY_SPIN] (state,payload) {
        state.showBodySpin = false
      }
    },
    actions: {
      [types.LOGIN_VERIFICATIONCODE] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_VERIFICATIONCODE, JSON.stringify(params.param),params.callback)
      },
      [types.LOGIN_SUBMIT] ({ commit, rootState }, params) {
        rest.post(links.LOGIN_SUBMIT, JSON.stringify(params.param),params.callback)
      },
      [types.LOGIN_OUT] ({ commit, rootState }, params) {
        rest.get(links.LOGIN_OUT, '',params.callback)
      }
    },
    getters: {
    },
    modules: {
      user,
      account,
      finance
    }
  })
}

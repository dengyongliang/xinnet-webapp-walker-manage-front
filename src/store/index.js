import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import user from './user.js'
import account from './account.js'
import client from './client.js'
import finance from './finance.js'
import order from './order.js'
import worklist from './worklist.js'
import service from './service.js'
import butler from './butler.js'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { loginByUserName, loginVerificationCode, loginOut } from '@/api/login.js'
import { queryCompanys } from '@/api/global.js'

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
      LOGIN_BY_USER_NAME ({commit}, params) {
        return new Promise((resolve, reject) => {
          loginByUserName(params.account, params.password, params.verificationCode).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      LOGIN_VERIFICATION_CODE ({commit}, params) {
        return new Promise((resolve, reject) => {
          loginVerificationCode(params.userCode).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      LOGIN_OUT ({ commit }) {
        return new Promise((resolve, reject) => {
          loginOut().then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      QUERY_COMPANYS ({commit}, params) {
        return new Promise((resolve, reject) => {
          queryCompanys(params.customerId).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    getters: {
    },
    modules: {
      user,
      client,
      account,
      finance,
      order,
      service,
      worklist,
      butler
    }
  })
}

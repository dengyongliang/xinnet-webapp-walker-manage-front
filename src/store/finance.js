import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.GET_BILL_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_BILL_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.CONFIRM_BILL_CLEAN] ({ commit, rootState }, params) {
      rest.post(links.CONFIRM_BILL_CLEAN, params.param)
        .then(params.callback)
        .catch()
    },
    [types.GET_CLIENT_BALANCE_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_CLIENT_BALANCE_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.GET_PAYMENT_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_PAYMENT_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_CREDIT_MONEY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_CREDIT_MONEY_LIST, params.param)
        .then(params.callback)
        .catch()
    },
    [types.SUBMIT_ADD_CREDIT] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_ADD_CREDIT, params.param)
        .then(params.callback)
        .catch()
    },
    [types.SUBMIT_ADD_PAYMENT] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_ADD_PAYMENT, params.param)
        .then(params.callback)
        .catch()
    }
  }
}

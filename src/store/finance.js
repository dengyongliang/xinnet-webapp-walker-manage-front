import * as types from './types'
import rest from '../global/rest.js'
import * as links from '../global/linkdo.js'
// import * as links from '../global/linkdo_json.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.GET_BILL_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_BILL_LIST, params.param, params.callback)
    },
    [types.CONFIRM_BILL_CLEAN] ({ commit, rootState }, params) {
      rest.post(links.CONFIRM_BILL_CLEAN, params.param, params.callback)
    },
    [types.GET_CLIENT_BALANCE_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_CLIENT_BALANCE_LIST, params.param, params.callback)
    },
    [types.GET_PAYMENT_LIST] ({ commit, rootState }, params) {
      rest.post(links.GET_PAYMENT_LIST, params.param, params.callback)
    },
    [types.QUERY_CREDIT_MONEY_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_CREDIT_MONEY_LIST, params.param, params.callback)
    },
    [types.SUBMIT_ADD_CREDIT] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_ADD_CREDIT, params.param, params.callback)
    },
    [types.SUBMIT_ADD_PAYMENT] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_ADD_PAYMENT, params.param, params.callback)
    }
  }
}

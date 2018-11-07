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
      rest.get(links.GET_BILL_LIST, params.param,params.callback)
    },
    [types.CONFIRM_BILL_CLEAN] ({ commit, rootState }, params) {
      rest.get(links.CONFIRM_BILL_CLEAN, params.param,params.callback)
    },
    [types.GET_CLIENT_BALANCE_LIST] ({ commit, rootState }, params) {
      rest.get(links.CONFIRM_BILL_CLEAN, params.param,params.callback)
    },
    [types.GET_PAYMENT_LIST] ({ commit, rootState }, params) {
      rest.get(links.GET_PAYMENT_LIST, params.param,params.callback)
    },
    [types.QUERY_CLIENT] ({ commit, rootState }, params) {
      rest.get(links.QUERY_CLIENT, params.param,params.callback)
    }
  }
}

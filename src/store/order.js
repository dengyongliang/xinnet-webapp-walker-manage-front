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
    [types.QUERY_ORDER_LIST] ({ commit, rootState }, params) {
      rest.post(links.QUERY_ORDER_LIST, JSON.stringify(params.param),params.callback)
    },
    [types.EXPORT_ORDER_LIST] ({ commit, rootState }, params) {
      rest.post(links.EXPORT_ORDER_LIST, JSON.stringify(params.param),params.callback)
    },
    [types.SUBMIT_ADD_ORDER_ENTRY] ({ commit, rootState }, params) {
      rest.post(links.SUBMIT_ADD_ORDER_ENTRY, JSON.stringify(params.param),params.callback)
    }
  }
}

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
    [types.GET_ADMIN_LIST_DATA] ({ commit, rootState }, params) {
      rest.post(links.GET_ADMIN_LIST_DATA, JSON.stringify(params.param),params.callback)
    },
    [types.GET_CLIENT_LIST_DATA] ({ commit, rootState }, params) {
      rest.post(links.GET_CLIENT_LIST_DATA, JSON.stringify(params.param),params.callback)
    },
    [types.CREAT_ADMIN] ({ commit, rootState }, params) {
      rest.post(links.CREAT_ADMIN, JSON.stringify(params.param),params.callback)
    },
    [types.CREAT_CLIENT] ({ commit, rootState }, params) {
      rest.post(links.CREAT_CLIENT, JSON.stringify(params.param),params.callback)
    },
    [types.MODIFY_CLIENT] ({ commit, rootState }, params) {
      rest.post(links.MODIFY_CLIENT, JSON.stringify(params.param),params.callback)
    },
    [types.QUERY_BUTLER] ({ commit, rootState }, params) {
      rest.post(links.QUERY_BUTLER, JSON.stringify(params.param),params.callback)
    },
    [types.SET_CUSTOMER_STATUS] ({ commit, rootState }, params) {
      rest.post(links.SET_CUSTOMER_STATUS, JSON.stringify(params.param),params.callback)
    }
  }
}

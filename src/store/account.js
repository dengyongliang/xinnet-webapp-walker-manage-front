import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.GET_ADMIN_LIST_DATA] ({ commit, rootState }, params) {
      rest.get(links.GET_ADMIN_LIST_DATA, params.param)
        .then(params.callback)
        .catch()
    },
    [types.GET_CLIENT_LIST_DATA] ({ commit, rootState }, params) {
      rest.get(links.GET_CLIENT_LIST_DATA, params.param)
        .then(params.callback)
        .catch()
    },
    [types.CREAT_ADMIN] ({ commit, rootState }, params) {
      rest.get(links.CREAT_ADMIN, params.param)
        .then(params.callback)
        .catch()
    },
    [types.CREAT_CLIENT] ({ commit, rootState }, params) {
      rest.get(links.CREAT_CLIENT, params.param)
        .then(params.callback)
        .catch()
    },
    [types.MODIFY_CLIENT] ({ commit, rootState }, params) {
      rest.get(links.MODIFY_CLIENT, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_BUTLER] ({ commit, rootState }, params) {
      rest.get(links.QUERY_BUTLER, params.param)
        .then(params.callback)
        .catch()
    },
    [types.SET_CUSTOMER_STATUS] ({ commit, rootState }, params) {
      rest.get(links.SET_CUSTOMER_STATUS, params.param)
        .then(params.callback)
        .catch()
    }
  }
}

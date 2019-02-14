import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_BUDGET_REPORT_MANAGE] ({ commit, rootState }, params) {
      rest.get(links.QUERY_BUDGET_REPORT_MANAGE, params.param)
        .then(params.callback)
        .catch()
    },
    [types.QUERY_BUDGET_REPORT_DETAIL] ({ commit, rootState }, params) {
      rest.get(links.QUERY_BUDGET_REPORT_DETAIL, params.param)
        .then(params.callback)
        .catch()
    },
    [types.ADD_BUDGET_REPORT] ({ commit, rootState }, params) {
      rest.get(links.ADD_BUDGET_REPORT, params.param)
        .then(params.callback)
        .catch()
    },
    [types.UPDATE_BUDGET_REPORT] ({ commit, rootState }, params) {
      rest.get(links.UPDATE_BUDGET_REPORT, params.param)
        .then(params.callback)
        .catch()
    },
    [types.DELETE_BUDGET_REPORT] ({ commit, rootState }, params) {
      rest.get(links.DELETE_BUDGET_REPORT, params.param)
        .then(params.callback)
        .catch()
    }
  }
}

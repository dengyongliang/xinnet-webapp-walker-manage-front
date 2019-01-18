import * as types from './types'
import rest from '../global/rest.js'
// import * as links from '../global/linkdo.js'
import * as links from '../global/linkdo_json.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    [types.QUERY_BUDGET_REPORT_MANAGE] ({ commit, rootState }, params) {
      rest.get(links.QUERY_BUDGET_REPORT_MANAGE, JSON.stringify(params.param),params.callback)
    }
  }
}

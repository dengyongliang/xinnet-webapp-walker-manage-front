
import * as api from '@/api/worklist.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_WORK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.queryWorkList(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

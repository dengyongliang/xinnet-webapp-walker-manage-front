import * as api from '@/api/worklist.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    WORK_ORDER_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.queryWorkList(params.pageNum, params.pageSize, params.domainName,params.createTimeBegin,params.createTimeEnd,params.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
	WORK_ORDER_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.workOrderUpdate(params.id, params.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

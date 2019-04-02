import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryWorkList } from '@/api/worklist.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_WORK_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryWorkList(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

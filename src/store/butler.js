import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryButlerList, addButler, queryButler } from '@/api/butler.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_BUTLER_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryButlerList(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_BUTLER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addButler(params.userName, params.userEmail).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_BUTLER ({ commit }) {
      return new Promise((resolve, reject) => {
        queryButler().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

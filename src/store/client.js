import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryClientList, findCustomerList, findCustomer, createCustomer, updateCustomer, setCustomerStatus } from '@/api/client.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_CLIENT_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryClientList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FIND_CUSTOMER_LIST ({ commit }) {
      return new Promise((resolve, reject) => {
        findCustomerList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FIND_CUSTOMER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        findCustomer(params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREATE_CUSTOMER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        createCustomer(params.name, params.orgCode, params.accountPeriod, params.creditBalance, params.customerUserId, params.orgFile, params.contactor, params.mobile, params.email, params.tel).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_CUSTOMER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateCustomer(params.name, params.orgCode, params.accountPeriod, params.creditBalance, params.customerUserId, params.orgFile, params.contactor, params.mobile, params.email, params.tel, params.code).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_CUSTOMER_STATUS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        setCustomerStatus(params.code, params.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

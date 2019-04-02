import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryPaymentList, queryBalanceList, queryBillList, queryCreditList, addPayment, addCredit, customerBillPay } from '@/api/finance.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_BILL_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBillList(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_BILL_PAY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        customerBillPay(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_BALANCE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBalanceList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_PAYMENT_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryPaymentList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_CREDIT_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryCreditList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_PAYMENT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addPayment(params.customerId, params.payMoney).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_CREDIT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addCredit(params.customerId, params.creditMoney).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

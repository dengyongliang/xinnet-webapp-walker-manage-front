
import * as api from '@/api/finance.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    CUSTOMER_BILL_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerBillList(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_BILL_PAY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerBillPay(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_BALANCE_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerBalanceList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PAY_MONEY_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.payMoneyList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CREDIT_MONEY_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.creditMoneyList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_PAY_MONEY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.addPayMoney(params.customerId, params.payMoney).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_CREDIT_MONEY ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.addCreditMoney(params.customerId, params.creditMoney).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

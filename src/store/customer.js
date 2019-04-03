
import * as api from '@/api/customer.js'

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    CUSTOMER_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerList(params.pageNum, params.pageSize, params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FIND_CUSTOMER_LIST ({ commit }) {
      return new Promise((resolve, reject) => {
        api.findCustomerList().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FIND_CUSTOMER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.findCustomer(params.customerCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_CREATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerCreate(params.name, params.orgCode, params.accountPeriod, params.creditBalance, params.customerUserId, params.orgFile, params.contactor, params.mobile, params.email, params.tel).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_UPDATE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.customerUpdate(params.name, params.orgCode, params.accountPeriod, params.creditBalance, params.customerUserId, params.orgFile, params.contactor, params.mobile, params.email, params.tel, params.code).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SET_CUSTOMER_STATUS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.setCustomerStatus(params.code, params.status).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    HOUSE_KEEPERS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.houseKeepers(params.pageNum, params.pageSize, params.userId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_KEEPER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.addKeeper(params.userName, params.userEmail).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CUSTOMER_USERS ({ commit }) {
      return new Promise((resolve, reject) => {
        api.customerUsers().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    COMPANYS ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.companys(params.customerId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

import * as api from '@/api/followdomain.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    FOLLOW_DOMAIN_LIST ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainList(params.pageNum, params.pageSize, params.domainName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_DOMAIN_CREATE_DOMAIN ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainCreateDomain(params.domainNames).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

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
    FOLLOW_DOMAIN_CREATE ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainCreateDomain(params.domainNames).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_DOMAIN_INFO ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainInfo(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_DOMAIN_UPDATE ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainUpdate(params.id, params.registrarName, params.whoisUserName, params.whoisUserEmail, params.whoisApplyTime, params.whoisExpireTime, params.whoisUpdateTime, params.whoisDomainStatus, params.whoisDomainDns, params.dnsIpContent, params.dnsSelfIpContent, params.dnsIpAddress, params.beianNum, params.beianCompany, params.beianCompanyType, params.beianAuditTime, params.siteTitle, params.siteKey, params.siteDesc).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FOLLOW_DOMAIN_REFRESE ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.followDomainRefrese(params.id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

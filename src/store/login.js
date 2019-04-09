import * as api from '@/api/login.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    LOGIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.login(params.account, params.password, params.verificationCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADM_LOGIN ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.admLogin(params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGOUT ({ commit }) {
      return new Promise((resolve, reject) => {
        api.logout().then(response => {
          commit('LOGIN_FALSE')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}


import * as api from '@/api/user.js'
export default {
  state: {
    myUserInfo: {
      // "userCode": "walker_super",
      // "userName": "超级管理员",
      // "userMobile": "15110066180",
      // "userEmail": "baiyu@xinnet.com",
      // "userTel": "01087128712",
      // "userSex": "1",
      // "status": 1,
      // "createTime": 1540342980000,
      // "lastLoginTime": 1540537863000,
      // "lastLoginIp": "124.127.244.5",
      // "userRoles": [{
      //   "id": 1,
      //   "roleCode": "super",
      //   "roleName": "超级管理员",
      //   "status": 1,
      //   "scope": 0,
      //   "userId": 1,
      //   "customerId": 0,
      //   "createTime": 1540342800000,
      //   "description": "系统超级管理员"
      // }],
      // "userMenus": [{
      //   "id": 1,
      //   "menuCode": "sys_user_list",
      //   "menuName": "用户管理",
      //   "menuUrl": "/user/list",
      //   "parentMenuCode": "0",
      //   "menuGroup": "1",
      //   "menuSort": "1",
      //   "createTime": 1540343160000
      // }]
    },
    rolesList: []
  },
  mutations: {
    SET_CURRENT_USER_DATA (state, payload) {
      state.myUserInfo = payload.data
    },
    SET_ROLES_DATA (state, payload) {
      state.rolesList = payload.data
      console.log(state.rolesList)
    }
  },
  actions: {
    MY_USER_INFO ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        api.myUserInfo().then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            // rootState.islogin = true
            commit('SET_CURRENT_USER_DATA', response.data)
            commit('LOGIN_TRUE')
            // 获取角色数据
            api.adminRoles().then(response => {
              if (!response) {
                return false
              }
              if (response.data.code === '1000') {
                commit('SET_ROLES_DATA', response.data)
              } else {
              }
            }).catch(() => {})
            setTimeout(() => {
              // rootState.pending = false
              // rootState.showBodySpin = false
              commit('HIDE_BODY_SPIN')
            }, 350)
          } else {
            // rootState.islogin = false
            // rootState.showBodySpin = false
            commit('HIDE_BODY_SPIN')
            commit('LOGIN_FALSE')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.updateUserPassword(params.oldPassword, params.newPassword, params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.addUserInfo(params.userName, params.userMobile, params.userEmail, params.roleCode, params.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    USER_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.userList(params.pageNum, params.pageSize, params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.deleteUserInfo(params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_USER_INFO ({ commit }, params) {
      params = Object.assign({
        userName: '',
        userMobile: '',
        userEmail: '',
        userCode: '',
        userTel: '',
        roleId: '',
        qq: '',
        wx: ''
      }, params)
      return new Promise((resolve, reject) => {
        api.updateUserInfo(params.userName, params.userMobile, params.userEmail, params.userCode, params.userTel, params.qq, params.wx, params.roleId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

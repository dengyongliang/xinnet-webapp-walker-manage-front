import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryCurrentUserData, queryUserList, delUser, updateUserInfo, addUserInfo, updateUserPassword } from '@/api/user.js'
import { queryRoles } from '@/api/global.js'
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
    [types.SET_CURRENT_USER_DATA] (state, payload) {
      state.myUserInfo = payload.data
    },
    [types.SET_ROLES_DATA] (state, payload) {
      state.rolesList = payload.data
      console.log(state.rolesList)
    }
  },
  actions: {
    QUERY_CURRENT_USER_DATA ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        queryCurrentUserData().then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            rootState.islogin = true
            commit(types.SET_CURRENT_USER_DATA, response.data)
            // 获取角色数据
            queryRoles().then(response => {
              if (!response) {
                return false
              }
              if (response.data.code === '1000') {
                commit(types.SET_ROLES_DATA, response.data)
              } else {
              }
            }).catch(error => {})
            setTimeout(() => {
              rootState.pending = false
              rootState.showBodySpin = false
            }, 350)
          } else {
            rootState.islogin = false
            rootState.showBodySpin = false
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // [types.SET_USER_PASSWORD] ({ commit, rootState }, params) {
    //   rest.post(links.SET_USER_PASSWORD, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // },
    // [types.SET_USER_INFO] ({ commit, rootState }, params) {
    //   // /manage/user/updateUserInfo
    //   rest.post(links.SET_USER_INFO, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // },
    // [types.DEL_USER] ({ dispatch, commit, rootState }, params) {
    //   rest.post(links.DEL_USER, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // },
    // [types.CREAT_NEW_ACCOUNT] ({ dispatch, commit, rootState }, params) {
    //   rest.post(links.CREAT_NEW_ACCOUNT, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // },

    UPDATE_USER_PASSWORD ({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateUserPassword(params.oldPassword, params.newPassword, params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_USER_INFO ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addUserInfo(params.userName, params.userMobile, params.userEmail, params.roleCode, params.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_USER_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryUserList(params.pageNum, params.pageSize, params.userCode).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DEL_USER ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delUser(params.userCode).then(response => {
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
        updateUserInfo(params.userName, params.userMobile, params.userEmail, params.userCode, params.userTel, params.qq, params.wx, params.roleId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

    // [types.QUERY_CLIENT] ({ commit, rootState }, params) {
    //   rest.post(links.QUERY_CLIENT, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // }

    // [types.QUERY_COMPANYS] ({ commit, rootState }, params) {
    //   rest.post(links.QUERY_COMPANYS, params.param)
    //     .then(params.callback)
    //     .catch(() => {})
    // }
  }
}

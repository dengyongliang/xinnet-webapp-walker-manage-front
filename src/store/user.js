import * as types from './types'
import rest from '../global/rest.js'
import * as links from '../global/linkdo.js'
// import * as links from '../global/linkdo_json.js'
const api = process.env.NODE_ENV === 'production' ? '' : '/api'
export default {
  state: {
    myUserInfo: {
      "userCode": "walker_super",
      "userName": "超级管理员",
      "userMobile": "15110066180",
      "userEmail": "baiyu@xinnet.com",
      "userTel": "01087128712",
      "userSex": "1",
      "status": 1,
      "createTime": 1540342980000,
      "lastLoginTime": 1540537863000,
      "lastLoginIp": "124.127.244.5",
      "userRoles": [{
        "id": 1,
        "roleCode": "super",
        "roleName": "超级管理员",
        "status": 1,
        "scope": 0,
        "userId": 1,
        "customerId": 0,
        "createTime": 1540342800000,
        "description": "系统超级管理员"
      }],
      "userMenus": [{
        "id": 1,
        "menuCode": "sys_user_list",
        "menuName": "用户管理",
        "menuUrl": "/user/list",
        "parentMenuCode": "0",
        "menuGroup": "1",
        "menuSort": "1",
        "createTime": 1540343160000
      }]
    },
    rolesList: []
  },
  mutations: {
    [types.SET_CURRENT_USER_DATA] (state,payload) {
      state.myUserInfo = payload.data
    },
    [types.SET_ROLES_DATA] (state,payload) {
      state.rolesList = payload.data
      console.log(state.rolesList)
    }
  },
  actions: {
    [types.GET_CURRENT_USER_DATA] ({ commit, rootState }) {
      //NProgress.start()
      rest.get(links.GET_CURRENT_USER_DATA,'',function(response){
        // NProgress.done()
        if( response.data.code === '1000' ){
          rootState.islogin = true
          commit(types.SET_CURRENT_USER_DATA, response.data)
          // 获取角色数据
          rest.get(links.GET_ROLES_DATA,'',function(response){
            if( response.data.code === '1000' ){
              commit(types.SET_ROLES_DATA, response.data)
            } else {

            }
          })
          setTimeout( () => {
            rootState.pending = false
            rootState.showBodySpin = false
          },350 )
        } else {
          rootState.islogin = false
          rootState.showBodySpin = false
        }
        return response
      })
    },
    [types.SET_USER_PASSWORD] ({ commit, rootState },params) {
      rest.post(links.SET_USER_PASSWORD, JSON.stringify(params.param),params.callback)
    },
    [types.SET_USER_INFO] ({ commit, rootState },params) {
      // /manage/user/updateUserInfo
      rest.post(links.SET_USER_INFO, JSON.stringify(params.param),params.callback)
    },
    [types.DEL_USER] ({ dispatch, commit, rootState },params) {
      rest.post(links.DEL_USER, JSON.stringify(params.param),params.callback)
    },
    [types.CREAT_NEW_ACCOUNT] ({ dispatch, commit, rootState },params) {
      rest.post(links.CREAT_NEW_ACCOUNT, JSON.stringify(params.param),params.callback)
    },
    [types.GET_USER_LIST_DATA] ({ commit, rootState }, params) {
      rest.post(links.GET_USER_LIST_DATA, JSON.stringify(params.param),params.callback)
    },
  }
}

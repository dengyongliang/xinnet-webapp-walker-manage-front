'use strict'
/*
  user api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'

// 获取当前账号信息
export const myUserInfo = () => { // queryCurrentUserData
  return axios({
    url: action.MY_USER_INFO,
    method: 'GET'
  })
}
// 账号管理 - 列表
export const userList = (pageNum, pageSize, userCode) => { // queryUserList
  return axios({
    url: action.USER_LIST,
    method: 'POST',
    data: {pageNum, pageSize, userCode}
  })
}
// 账号删除
export const deleteUserInfo = (userCode) => { // delUser
  return axios({
    url: action.DELETE_USER_INFO,
    method: 'POST',
    data: {userCode}
  })
}
// 账号信息更新
export const updateUserInfo = (userName, userMobile, userEmail, userCode, userTel, roleId, qq, wx) => { // updateUserInfo
  return axios({
    url: action.UPDATE_USER_INFO,
    method: 'POST',
    data: {userName, userMobile, userEmail, userCode, userTel, roleId, qq, wx}
  })
}
// 创建账号
export const addUserInfo = (userName, userMobile, userEmail, roleCode, password) => { // addUserInfo
  return axios({
    url: action.ADD_USER_INFO,
    method: 'POST',
    data: {userName, userMobile, userEmail, roleCode, password}
  })
}
// 更新账号密码
export const updateUserPassword = (oldPassword, newPassword, userCode) => { // updateUserPassword
  return axios({
    url: action.UPDATE_USER_PASSWORD,
    method: 'POST',
    data: {oldPassword, newPassword, userCode}
  })
}
// 查询角色信息
export const adminRoles = () => { // queryRoles
  return axios({
    url: action.ADMIN_ROLES,
    method: 'GET'
  })
}

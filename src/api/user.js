/*
  user api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'

// 获取当前账号信息
export const queryCurrentUserData = () => {
  return axios({
    url: links.GET_CURRENT_USER_DATA,
    method: 'GET'
  })
}
// 账号管理 - 列表
export const queryUserList = (pageNum, pageSize, userCode) => {
  return axios({
    url: links.GET_USER_LIST_DATA,
    method: 'POST',
    data: {pageNum, pageSize, userCode}
  })
}
// 账号删除
export const delUser = (userCode) => {
  return axios({
    url: links.DEL_USER,
    method: 'POST',
    data: {userCode}
  })
}
// 账号信息更新
export const updateUserInfo = (userName, userMobile, userEmail, userCode, userTel, qq, wx) => {
  return axios({
    url: links.SET_USER_INFO,
    method: 'POST',
    data: {userName, userMobile, userEmail, userCode, userTel, qq, wx}
  })
}
// 创建账号
export const addUserInfo = (userName, userMobile, userEmail, roleCode, password) => {
  return axios({
    url: links.CREAT_NEW_ACCOUNT,
    method: 'POST',
    data: {userName, userMobile, userEmail, roleCode, password}
  })
}
// 更新账号密码
export const updateUserPassword = (oldPassword, newPassword, userCode) => {
  return axios({
    url: links.SET_USER_PASSWORD,
    method: 'POST',
    data: {oldPassword, newPassword, userCode}
  })
}

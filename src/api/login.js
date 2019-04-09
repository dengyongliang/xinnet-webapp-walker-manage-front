'use strict'
/*
  login api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 登录
export const login = (account, password, verificationCode) => { // loginByUserName
  return axios({
    url: action.LOGIN,
    method: 'POST',
    data: {account, password, verificationCode}
  })
}

// 登录验证码
export const admLogin = (userCode) => { // loginVerificationCode
  return axios({
    url: action.ADM_LOGIN,
    method: 'POST',
    data: {userCode}
  })
}

// 登出
export const logout = () => { // loginOut
  return axios({
    url: action.LOGOUT,
    method: 'POST'
  })
}

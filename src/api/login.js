/*
  login api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 登录
export const loginByUserName = (account, password, verificationCode) => {
  return axios({
    url: links.LOGIN_SUBMIT,
    method: 'POST',
    data: {account, password, verificationCode}
  })
}

// 登录验证码
export const loginVerificationCode = (userCode) => {
  return axios({
    url: links.LOGIN_VERIFICATIONCODE,
    method: 'POST',
    data: {userCode}
  })
}

// 登出
export const loginOut = () => {
  return axios({
    url: links.LOGIN_OUT,
    method: 'POST'
  })
}

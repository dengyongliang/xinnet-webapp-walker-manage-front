'use strict'
/*
  customer api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 客户管理 - 列表
export const customerList = (pageNum, pageSize, customerCode) => { // queryClientList
  return axios({
    url: action.CUSTOMER_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}

// 查找客户多个
export const findCustomerList = () => { // findCustomerList
  return axios({
    url: action.FIND_CUSTOMER_LIST,
    method: 'POST',
    data: {}
  })
}
// 查找客户一个
export const findCustomer = (customerCode) => { // findCustomer
  return axios({
    url: action.FIND_CUSTOMER,
    method: 'POST',
    data: {customerCode}
  })
}
// 创建账号
export const customerCreate = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel) => { // createCustomer
  return axios({
    url: action.CUSTOMER_CREATE,
    method: 'POST',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel}
  })
}
// 创建账号
export const customerUpdate = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, code) => { // updateCustomer
  return axios({
    url: action.CUSTOMER_UPDATE,
    method: 'POST',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, code}
  })
}
// 停/启用客户
export const setCustomerStatus = (code, status) => { // setCustomerStatus
  return axios({
    url: action.SET_CUSTOMER_STATUS,
    method: 'POST',
    data: {code, status}
  })
}
// 管家管理 - 列表
export const houseKeepers = (pageNum, pageSize, userId) => { // queryButlerList
  return axios({
    url: action.HOUSE_KEEPERS,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}
// 管家创建
export const addKeeper = (userName, userEmail) => { // addButler
  return axios({
    url: action.ADD_KEEPER,
    method: 'POST',
    data: {userName, userEmail}
  })
}
// 查询管家
export const customerUsers = () => { // queryButler
  return axios({
    url: action.CUSTOMER_USERS,
    method: 'POST',
    data: {}
  })
}
// 查询企业
export const companys = (customerId) => { // queryCompanys
  return axios({
    url: action.COMPANYS,
    method: 'POST',
    data: {customerId}
  })
}

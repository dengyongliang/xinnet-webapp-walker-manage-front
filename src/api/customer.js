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
    method: 'get',
    data: {pageNum, pageSize, customerCode}
  })
}

// 查找客户多个
export const findCustomerList = () => { // findCustomerList
  return axios({
    url: action.FIND_CUSTOMER_LIST,
    method: 'get',
    data: {}
  })
}
// 查找客户一个
export const findCustomer = (customerCode) => { // findCustomer
  return axios({
    url: action.FIND_CUSTOMER,
    method: 'get',
    data: {customerCode}
  })
}
// 创建账号
export const customerCreate = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, superName, superEmail) => { // createCustomer
  return axios({
    url: action.CUSTOMER_CREATE,
    method: 'get',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, superName, superEmail}
  })
}
// 创建账号
export const customerUpdate = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, superName, superEmail, code) => { // updateCustomer
  return axios({
    url: action.CUSTOMER_UPDATE,
    method: 'get',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, superName, superEmail, code}
  })
}
// 停/启用客户
export const setCustomerStatus = (code, status) => { // setCustomerStatus
  return axios({
    url: action.SET_CUSTOMER_STATUS,
    method: 'get',
    data: {code, status}
  })
}
// 管家管理 - 列表
export const houseKeepers = (pageNum, pageSize, userId) => { // queryButlerList
  return axios({
    url: action.HOUSE_KEEPERS,
    method: 'get',
    data: {pageNum, pageSize, userId}
  })
}
// 管家创建
export const addKeeper = (userName, userEmail) => { // addButler
  return axios({
    url: action.ADD_KEEPER,
    method: 'get',
    data: {userName, userEmail}
  })
}
// 查询管家
export const customerUsers = () => { // queryButler
  return axios({
    url: action.CUSTOMER_USERS,
    method: 'get',
    data: {}
  })
}
// 查询企业
export const companys = (customerId) => { // queryCompanys
  return axios({
    url: action.COMPANYS,
    method: 'get',
    data: {customerId}
  })
}

/*
  client api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 客户管理 - 列表
export const queryClientList = (pageNum, pageSize, customerCode) => {
  return axios({
    url: links.GET_CLIENT_LIST_DATA,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}

// 查找客户多个
export const findCustomerList = () => {
  return axios({
    url: links.FIND_CUSTOMER_LIST,
    method: 'POST',
    data: {}
  })
}
// 查找客户一个
export const findCustomer = (customerCode) => {
  return axios({
    url: links.QUERY_CLIENT,
    method: 'POST',
    data: {customerCode}
  })
}
// 创建账号
export const createCustomer = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel) => {
  return axios({
    url: links.CREAT_CLIENT,
    method: 'POST',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel}
  })
}
// 创建账号
export const updateCustomer = (name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, code) => {
  return axios({
    url: links.MODIFY_CLIENT,
    method: 'POST',
    data: {name, orgCode, accountPeriod, creditBalance, customerUserId, orgFile, contactor, mobile, email, tel, code}
  })
}
// 停/启用客户
export const setCustomerStatus = (code, status) => {
  return axios({
    url: links.SET_CUSTOMER_STATUS,
    method: 'POST',
    data: {code, status}
  })
}

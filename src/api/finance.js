/*
  finance api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 预付款增加管理 - 列表
export const queryPaymentList = (pageNum, pageSize, customerCode) => {
  return axios({
    url: links.GET_PAYMENT_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 客户账户余额查询 - 列表
export const queryBalanceList = (pageNum, pageSize, customerCode) => {
  return axios({
    url: links.GET_CLIENT_BALANCE_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 账单结算 - 列表
export const queryBillList = (pageNum, pageSize, userId) => {
  return axios({
    url: links.GET_BILL_LIST,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}
// 客户额度调整 - 列表
export const queryCreditList = (pageNum, pageSize, customerCode) => {
  return axios({
    url: links.QUERY_CREDIT_MONEY_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 增加预付款
export const addPayment = (customerId, payMoney) => {
  return axios({
    url: links.SUBMIT_ADD_PAYMENT,
    method: 'POST',
    data: {customerId, payMoney}
  })
}
// 增加额度
export const addCredit = (customerId, creditMoney) => {
  return axios({
    url: links.SUBMIT_ADD_CREDIT,
    method: 'POST',
    data: {customerId, creditMoney}
  })
}

// 账单结算确认
export const customerBillPay = (id) => {
  return axios({
    url: links.CONFIRM_BILL_CLEAN,
    method: 'POST',
    data: {id}
  })
}

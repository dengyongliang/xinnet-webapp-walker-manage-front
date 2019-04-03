'use strict'
/*
  finance api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 预付款增加管理 - 列表
export const payMoneyList = (pageNum, pageSize, customerCode) => { // queryPaymentList
  return axios({
    url: action.PAY_MONEY_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 客户账户余额查询 - 列表
export const customerBalanceList = (pageNum, pageSize, customerCode) => { // queryBalanceList
  return axios({
    url: action.CUSTOMER_BALANCE_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 账单结算 - 列表
export const customerBillList = (pageNum, pageSize, userId) => { // queryBillList
  return axios({
    url: action.CUSTOMER_BILL_LIST,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}
// 客户额度调整 - 列表
export const creditMoneyList = (pageNum, pageSize, customerCode) => { // queryCreditList
  return axios({
    url: action.CREDIT_MONEY_LIST,
    method: 'POST',
    data: {pageNum, pageSize, customerCode}
  })
}
// 增加预付款
export const addPayMoney = (customerId, payMoney) => { // addPayment
  return axios({
    url: action.ADD_PAY_MONEY,
    method: 'POST',
    data: {customerId, payMoney}
  })
}
// 增加额度
export const addCreditMoney = (customerId, creditMoney) => { // addCredit
  return axios({
    url: action.ADD_CREDIT_MONEY,
    method: 'POST',
    data: {customerId, creditMoney}
  })
}

// 账单结算确认
export const customerBillPay = (id) => { // customerBillPay
  return axios({
    url: action.CUSTOMER_BILL_PAY,
    method: 'POST',
    data: {id}
  })
}

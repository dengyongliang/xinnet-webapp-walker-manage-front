'use strict'
/*
  order api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 订单管理 - 列表
export const orderList = (pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType) => {
  return axios({
    url: action.ORDER_LIST,
    method: 'get',
    data: {pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType}
  })
}

// 订单录入
export const entryOrder = (customerId, companyId, orderGoodsInfo, orderMoney, orderType, orderPayType) => {
  return axios({
    url: action.ENTRY_ORDER,
    method: 'get',
    data: {customerId, companyId, orderGoodsInfo, orderMoney, orderType, orderPayType}
  })
}

/*
  order api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 订单管理 - 列表
export const queryOrderList = (pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType) => {
  return axios({
    url: links.QUERY_ORDER_LIST,
    method: 'POST',
    data: {pageNum, pageSize, createTimeBegin, createTimeEnd, orderGoodsInfo, orderGoodsType, orderMode, orderPayType, orderType}
  })
}

// 订单录入
export const orderEntry = (customerId, companyId, orderGoodsInfo, orderMoney, orderType, orderPayType) => {
  return axios({
    url: links.SUBMIT_ADD_ORDER_ENTRY,
    method: 'POST',
    data: {customerId, companyId, orderGoodsInfo, orderMoney, orderType, orderPayType}
  })
}

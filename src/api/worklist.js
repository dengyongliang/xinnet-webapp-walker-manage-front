'use strict'
/*
  worklist api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 工单管理 - 列表
export const queryWorkList = (pageNum, pageSize,domainName,createTimeBegin,createTimeEnd,status) => { // queryWorkList
  return axios({
    url: action.WORK_ORDER_LIST,
    method: 'POST',
    data: {pageNum, pageSize,domainName,createTimeBegin,createTimeEnd,status}
  })
}
// 工单管理 - 修改
export const workOrderUpdate = (id,status) => { // workOrderUpdate
  return axios({
    url: action.WORK_ORDER_UPDATE,
    method: 'POST',
    data: {id,status}
  })
}

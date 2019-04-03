'use strict'
/*
  worklist api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 工单管理 - 列表
export const queryWorkList = (pageNum, pageSize, userId) => { // queryWorkList
  return axios({
    url: action.CUSTOMER_LIST,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}

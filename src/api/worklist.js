/*
  worklist api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 工单管理 - 列表
export const queryWorkList = (pageNum, pageSize, userId) => {
  return axios({
    url: links.GET_CLIENT_LIST_DATA,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}

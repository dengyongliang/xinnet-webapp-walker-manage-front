/*
  butler api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 管家管理 - 列表
export const queryButlerList = (pageNum, pageSize, userId) => {
  return axios({
    url: links.GET_ADMIN_LIST_DATA,
    method: 'POST',
    data: {pageNum, pageSize, userId}
  })
}
// 管家创建
export const addButler = (userName, userEmail) => {
  return axios({
    url: links.CREAT_ADMIN,
    method: 'POST',
    data: {userName, userEmail}
  })
}
// 查询管家
export const queryButler = () => {
  return axios({
    url: links.QUERY_BUTLER,
    method: 'POST',
    data: {}
  })
}

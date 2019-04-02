/*
  全局 api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 查询企业
export const queryCompanys = (customerId) => {
  return axios({
    url: links.QUERY_COMPANYS,
    method: 'POST',
    data: {customerId}
  })
}
// 查询角色信息
export const queryRoles = () => {
  return axios({
    url: links.GET_ROLES_DATA,
    method: 'GET'
  })
}

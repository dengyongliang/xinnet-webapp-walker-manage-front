'use strict'
/*
  followDomain api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 关注域名列表
export const followDomainList = (pageNum, pageSize, domainName) => {
  return axios({
    url: action.FOLLOW_DOMAIN_LIST,
    method: 'get',
    data: {pageNum, pageSize, domainName}
  })
}
export const followDomainCreateDomain = (domainNames) => {
  return axios({
    url: action.FOLLOW_DOMAIN_CREATE_DOMAIN,
    method: 'get',
    data: {domainNames}
  })
}

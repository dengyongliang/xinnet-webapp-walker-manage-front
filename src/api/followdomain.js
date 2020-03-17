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
    method: 'POST',
    data: {pageNum, pageSize, domainName}
  })
}
export const followDomainCreateDomain = (domainNames) => {
  return axios({
    url: action.FOLLOW_DOMAIN_CREATE,
    method: 'POST',
    data: {domainNames}
  })
}
export const followDomainInfo = (id) => {
  return axios({
    url: action.FOLLOW_DOMAIN_INFO,
    method: 'POST',
    data: {id}
  })
}

export const followDomainUpdate = (id, registrarName, whoisUserName, whoisUserEmail, whoisApplyTime, whoisExpireTime, whoisUpdateTime, whoisDomainStatus, whoisDomainDns, dnsIpContent, dnsSelfIpContent, dnsIpAddress, beianNum, beianCompany, beianCompanyType, beianAuditTime, siteTitle, siteKey, siteDesc, siteType) => {
  return axios({
    url: action.FOLLOW_DOMAIN_UPDATE,
    method: 'POST',
    data: {id, registrarName, whoisUserName, whoisUserEmail, whoisApplyTime, whoisExpireTime, whoisUpdateTime, whoisDomainStatus, whoisDomainDns, dnsIpContent, dnsSelfIpContent, dnsIpAddress, beianNum, beianCompany, beianCompanyType, beianAuditTime, siteTitle, siteKey, siteDesc, siteType}
  })
}
export const followDomainRefrese = (id) => {
  return axios({
    url: action.FOLLOW_DOMAIN_REFRESE,
    method: 'POST',
    data: {id}
  })
}

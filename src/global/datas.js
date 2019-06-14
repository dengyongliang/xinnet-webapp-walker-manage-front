'use strict'

const BUSINESS_LIST = [
  {register: '域名注册'},
  {renew: '域名续费'},
  {repurchase: '域名回购'},
  {protection: '域名保护'},
  {transferIn: '域名转入'}
]
const ORDER_GOODS_TYPE = [
  {1: '域名注册'},
  {2: '域名续费'},
  {3: '域名回购'},
  {4: '域名保护'},
  {5: '域名转入'}
]
const WORKORDER_STATUS = [
  {1: '待处理'},
  {2: '处理中'},
  {3: '已完成'}
]
export default
{
  BUSINESS_LIST,
  ORDER_GOODS_TYPE,
  WORKORDER_STATUS
}

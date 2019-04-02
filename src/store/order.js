import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryOrderList, orderEntry } from '@/api/order.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_ORDER_LIST ({ commit }, params) {
      params = Object.assign({
        pageNum: 1,
        pageSize: 20,
        createTimeBegin: '',
        createTimeEnd: '',
        orderGoodsInfo: '',
        orderGoodsType: '',
        orderMode: '',
        orderPayType: '',
        orderType: ''
      }, params)
      return new Promise((resolve, reject) => {
        queryOrderList(params.pageNum, params.pageSize, params.createTimeBegin, params.createTimeEnd, params.orderGoodsInfo, params.orderGoodsType, params.orderMode, params.orderPayType, params.orderType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ORDER_ENTRY ({commit}, params) {
      return new Promise((resolve, reject) => {
        orderEntry(params.customerId, params.companyId, params.orderGoodsInfo, params.orderMoney, params.orderType, params.orderPayType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

import * as api from '@/api/order.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    ORDER_LIST ({ commit }, params) {
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
        api.orderList(params.pageNum, params.pageSize, params.createTimeBegin, params.createTimeEnd, params.orderGoodsInfo, params.orderGoodsType, params.orderMode, params.orderPayType, params.orderType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ENTRY_ORDER ({commit}, params) {
      return new Promise((resolve, reject) => {
        api.entryOrder(params.customerId, params.companyId, params.orderGoodsInfo, params.orderMoney, params.orderType, params.orderPayType).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

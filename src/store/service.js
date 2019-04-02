import * as types from './types'
import rest from '../global/http.js'
import * as links from '../global/linkdo.js'
import { queryBudgetList, delBudgetReport, addBudgetReport, updateBudgetReport, queryBudgetReportDetail } from '@/api/budget.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    QUERY_BUDGET_LIST ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBudgetList(params.pageNum, params.pageSize, params.queryCondition).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DEL_BUDGET_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delBudgetReport(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_BUDGET_REPORT ({ commit }, budgetData) {
      return new Promise((resolve, reject) => {
        addBudgetReport(budgetData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_BUDGET_REPORT ({ commit }, budgetData) {
      return new Promise((resolve, reject) => {
        updateBudgetReport(budgetData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    QUERY_BUDGET_REPORT_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        queryBudgetReportDetail(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

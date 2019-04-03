import * as api from '@/api/report.js'
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    BUDGET_REPORT_MANAGE ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.budgetReportManage(params.pageNum, params.pageSize, params.queryCondition).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DELETE_BUDGET_REPORT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.deleteBudgetReport(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ADD_BUDGET_REPORT ({ commit }, budgetData) {
      return new Promise((resolve, reject) => {
        api.addBudgetReport(budgetData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UPDATE_BUDGET_REPORT ({ commit }, budgetData) {
      return new Promise((resolve, reject) => {
        api.updateBudgetReport(budgetData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FIND_BUDGET_REPORT_DETAIL ({ commit }, params) {
      return new Promise((resolve, reject) => {
        api.findBudgetReportDetail(params.reportId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

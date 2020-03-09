'use strict'
/*
  report api
*/
import axios from '@/global/axios.js'
import * as action from '@/global/action.js'
// 预算管理 - 列表
export const budgetReportManage = (pageNum, pageSize, queryCondition) => { // queryBudgetList
  return axios({
    url: action.BUDGET_REPORT_MANAGE,
    method: 'POST',
    data: {pageNum, pageSize, queryCondition}
  })
}
// 删除预算报告
export const deleteBudgetReport = (reportId) => { // delBudgetReport
  return axios({
    url: action.DELETE_BUDGET_REPORT,
    method: 'POST',
    data: {reportId}
  })
}
// 添加预算报告
export const addBudgetReport = (budgetData) => { // addBudgetReport
  return axios({
    url: action.ADD_BUDGET_REPORT,
    method: 'POST',
    data: budgetData
  })
}
// 更新预算报告
export const updateBudgetReport = (budgetData) => { // updateBudgetReport
  return axios({
    url: action.UPDATE_BUDGET_REPORT,
    method: 'POST',
    data: budgetData
  })
}
// 预算报告详情
export const findBudgetReportDetail = (reportId) => { // queryBudgetReportDetail
  return axios({
    url: action.FIND_BUDGET_REPORT_DETAIL,
    method: 'POST',
    data: {reportId}
  })
}

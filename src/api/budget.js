/*
  budget api
*/
import axios from '@/global/axios.js'
import * as links from '@/global/linkdo.js'
// 预算管理 - 列表
export const queryBudgetList = (pageNum, pageSize, queryCondition) => {
  return axios({
    url: links.QUERY_BUDGET_REPORT_MANAGE,
    method: 'POST',
    data: {pageNum, pageSize, queryCondition}
  })
}
// 删除预算报告
export const delBudgetReport = (reportId) => {
  return axios({
    url: links.DELETE_BUDGET_REPORT,
    method: 'POST',
    data: {reportId}
  })
}
// 添加预算报告
export const addBudgetReport = (budgetData) => {
  return axios({
    url: links.ADD_BUDGET_REPORT,
    method: 'POST',
    data: budgetData
  })
}
// 更新预算报告
export const updateBudgetReport = (budgetData) => {
  return axios({
    url: links.UPDATE_BUDGET_REPORT,
    method: 'POST',
    data: budgetData
  })
}
// 预算报告详情
export const queryBudgetReportDetail = (reportId) => {
  return axios({
    url: links.QUERY_BUDGET_REPORT_DETAIL,
    method: 'POST',
    data: {reportId}
  })
}

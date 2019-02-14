'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'
// 登出
export const LOGIN_OUT = '/admin/logout' + suffix
// 登录
export const LOGIN_SUBMIT = '/admin/login' + suffix
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = '/server/message/send/admlogin' + suffix
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = '/manage/user/myUserInfo' + suffix
// 获取角色信息
export const GET_ROLES_DATA = '/manage/user/adminRoles' + suffix
// 修改密码
export const SET_USER_PASSWORD = '/manage/user/updateUserPassword' + suffix
// 修改账号信息
export const SET_USER_INFO = '/manage/user/updateUserInfo' + suffix
// 删除账号信息
export const DEL_USER = '/manage/user/deleteUserInfo' + suffix
// 创建账号信息
export const CREAT_NEW_ACCOUNT = '/manage/user/addUserInfo' + suffix
// 获取账号列表
export const GET_USER_LIST_DATA = '/manage/user/userList' + suffix
// 获取管家列表
export const GET_ADMIN_LIST_DATA = '/manage/customer/houseKeepers' + suffix
// 获取客户列表
export const GET_CLIENT_LIST_DATA = '/manage/customer/customerList' + suffix
// 创建管家
export const CREAT_ADMIN = '/manage/customer/addKeeper' + suffix
// 创建客户信息
export const CREAT_CLIENT = '/manage/customer/customerCreate' + suffix
// 修改客户信息
export const MODIFY_CLIENT = '/manage/customer/customerUpdate' + suffix
// 获取账单结算列表
export const GET_BILL_LIST = '/manage/finance/customerBillList' + suffix
// 账单结算确认
export const CONFIRM_BILL_CLEAN = '/manage/finance/customerBillPay' + suffix
// 客户账户余额列表
export const GET_CLIENT_BALANCE_LIST = '/manage/finance/customerBalanceList' + suffix
// 预付款管理列表
export const GET_PAYMENT_LIST = '/manage/finance/payMoneyList' + suffix
// 预付款增加
export const SUBMIT_ADD_PAYMENT = '/manage/finance/addPayMoney' + suffix
// 查询客户 一个
export const QUERY_CLIENT = '/manage/customer/findCustomer' + suffix
// 查询客户 多个
export const QUERY_CLIENT_LIST = '/manage/customer/findCustomerList' + suffix
// 客户额度调整列表
export const QUERY_CREDIT_MONEY_LIST = '/manage/finance/creditMoneyList' + suffix
// 额度调整提交
export const SUBMIT_ADD_CREDIT = '/manage/finance/addCreditMoney' + suffix
// 查询订单列表
export const QUERY_ORDER_LIST = '/manage/order/orderList' + suffix
// 导出订单列表
export const EXPORT_ORDER_LIST = '/manage/order/exportOrder' + suffix
// 添加录入订单
export const SUBMIT_ADD_ORDER_ENTRY = '/manage/order/entryOrder' + suffix
// 查询管家
export const QUERY_BUTLER = '/manage/customer/customerUsers' + suffix
// 上传图片
export const UPLOAD_IMG = '/manage/customer/uploadfile' + suffix
// 停/启用客户
export const SET_CUSTOMER_STATUS = '/manage/customer/setCustomerStatus' + suffix
// 客户可用企业列表
export const QUERY_COMPANYS = '/manage/customer/companys' + suffix
// 域名预算报告-管理
export const QUERY_BUDGET_REPORT_MANAGE = '/manage/report/budgetReportManage' + suffix
// 域名预算报告-查询预算报告
export const QUERY_BUDGET_REPORT_DETAIL = '/manage/report/findBudgetReportDetail' + suffix
// 域名预算报告-添加预算报告
export const ADD_BUDGET_REPORT = '/manage/report/addBudgetReport' + suffix
// 域名预算报告-修改预算报告
export const UPDATE_BUDGET_REPORT = '/manage/report/updateBudgetReport' + suffix
// 域名预算报告-修改预算报告
export const DELETE_BUDGET_REPORT = '/manage/report/deleteBudgetReport' + suffix

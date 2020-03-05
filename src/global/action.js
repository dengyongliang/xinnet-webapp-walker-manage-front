'use strict'
const suffix = process.env.NODE_ENV === 'production' ? '' : '.js'
const adminApi = process.env.NODE_ENV === 'production' ? '/admin-api' : ''
// 登出
export const LOGOUT = '/admin/logout' + suffix // LOGIN_OUT
// 登录
export const LOGIN = '/admin/login' + suffix // LOGIN_SUBMIT
// 登录_获取验证码
export const ADM_LOGIN = '/server/message/send/admlogin' + suffix // LOGIN_VERIFICATIONCODE
// 获取当前账号信息
export const MY_USER_INFO = '/manage/user/myUserInfo' + suffix // GET_CURRENT_USER_DATA
// 获取角色信息
export const ADMIN_ROLES = '/manage/user/adminRoles' + suffix // GET_ROLES_DATA
// 修改密码
export const UPDATE_USER_PASSWORD = '/manage/user/updateUserPassword' + suffix // SET_USER_PASSWORD
// 修改账号信息
export const UPDATE_USER_INFO = '/manage/user/updateUserInfo' + suffix // SET_USER_INFO
// 删除账号信息
export const DELETE_USER_INFO = '/manage/user/deleteUserInfo' + suffix // DEL_USER
// 创建账号信息
export const ADD_USER_INFO = '/manage/user/addUserInfo' + suffix // CREAT_NEW_ACCOUNT
// 获取账号列表
export const USER_LIST = '/manage/user/userList' + suffix // GET_USER_LIST_DATA
// 获取管家列表
export const HOUSE_KEEPERS = '/manage/customer/houseKeepers' + suffix // GET_ADMIN_LIST_DATA
// 获取客户列表
export const CUSTOMER_LIST = '/manage/customer/customerList' + suffix // GET_CLIENT_LIST_DATA
// 创建管家
export const ADD_KEEPER = '/manage/customer/addKeeper' + suffix // CREAT_ADMIN
// 创建客户信息
export const CUSTOMER_CREATE = '/manage/customer/customerCreate' + suffix // CREAT_CLIENT
// 修改客户信息
export const CUSTOMER_UPDATE = '/manage/customer/customerUpdate' + suffix // MODIFY_CLIENT
// 获取账单结算列表
export const CUSTOMER_BILL_LIST = '/manage/finance/customerBillList' + suffix // GET_BILL_LIST
// 账单结算确认
export const CUSTOMER_BILL_PAY = '/manage/finance/customerBillPay' + suffix // CONFIRM_BILL_CLEAN
// 客户账户余额列表
export const CUSTOMER_BALANCE_LIST = '/manage/finance/customerBalanceList' + suffix // GET_CLIENT_BALANCE_LIST
// 预付款管理列表
export const PAY_MONEY_LIST = '/manage/finance/payMoneyList' + suffix // GET_PAYMENT_LIST
// 预付款增加
export const ADD_PAY_MONEY = '/manage/finance/addPayMoney' + suffix // SUBMIT_ADD_PAYMENT
// 查询客户 一个
export const FIND_CUSTOMER = '/manage/customer/findCustomer' + suffix // QUERY_CLIENT
// 查询客户 多个
export const FIND_CUSTOMER_LIST = '/manage/customer/findCustomerList' + suffix // FIND_CUSTOMER_LIST
// 客户额度调整列表
export const CREDIT_MONEY_LIST = '/manage/finance/creditMoneyList' + suffix // QUERY_CREDIT_MONEY_LIST
// 额度调整提交
export const ADD_CREDIT_MONEY = '/manage/finance/addCreditMoney' + suffix // SUBMIT_ADD_CREDIT
// 查询订单列表
export const ORDER_LIST = '/manage/order/orderList' + suffix // QUERY_ORDER_LIST
// 导出订单列表
export const EXPORT_ORDER = adminApi + '/manage/order/exportOrder' + suffix // EXPORT_ORDER_LIST
// 添加录入订单
export const ENTRY_ORDER = '/manage/order/entryOrder' + suffix // SUBMIT_ADD_ORDER_ENTRY
// 查询管家
export const CUSTOMER_USERS = '/manage/customer/customerUsers' + suffix // QUERY_BUTLER
// 上传图片
export const UPLOAD_FILE = adminApi + '/manage/customer/uploadfile' + suffix // UPLOAD_IMG
// 停/启用客户
export const SET_CUSTOMER_STATUS = '/manage/customer/setCustomerStatus' + suffix // SET_CUSTOMER_STATUS
// 客户可用企业列表
export const COMPANYS = '/manage/customer/companys' + suffix // QUERY_COMPANYS
// 域名预算报告-管理
export const BUDGET_REPORT_MANAGE = '/manage/report/budgetReportManage' + suffix // QUERY_BUDGET_REPORT_MANAGE
// 域名预算报告-查询预算报告
export const FIND_BUDGET_REPORT_DETAIL = '/manage/report/findBudgetReportDetail' + suffix // QUERY_BUDGET_REPORT_DETAIL
// 域名预算报告-添加预算报告
export const ADD_BUDGET_REPORT = '/manage/report/addBudgetReport' + suffix // ADD_BUDGET_REPORT
// 域名预算报告-修改预算报告
export const UPDATE_BUDGET_REPORT = '/manage/report/updateBudgetReport' + suffix // UPDATE_BUDGET_REPORT
// 域名预算报告-修改预算报告
export const DELETE_BUDGET_REPORT = '/manage/report/deleteBudgetReport' + suffix // DELETE_BUDGET_REPORT
// 工单管理-列表
export const WORK_ORDER_LIST = '/manage/workOrder/workOrderManage' + suffix // DELETE_BUDGET_REPORT
// 工单管理-设置状态
export const WORK_ORDER_UPDATE = '/manage/workOrder/setWorkOrderStatus' + suffix // DELETE_BUDGET_REPORT
// 关注域名列表
export const FOLLOW_DOMAIN_LIST = '/manage/followdomain/followDomainList' + suffix
// 关注域名列表
export const FOLLOW_DOMAIN_CREATE_DOMAIN = '/manage/followdomain/createDomain' + suffix

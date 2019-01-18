'use strict'
const api = process.env.NODE_ENV === 'production' ? '' : '/api'

// 登出
export const LOGIN_OUT = api + '/admin-api/admin/logout'
// 登录
export const LOGIN_SUBMIT = api + '/admin-api/admin/login'
// 登录_获取验证码
export const LOGIN_VERIFICATIONCODE = api + '/admin-api/server/message/send/admlogin'
// 获取当前账号信息
export const GET_CURRENT_USER_DATA = api + '/admin-api/manage/user/myUserInfo'
// 获取角色信息
export const GET_ROLES_DATA = api + '/admin-api/manage/user/adminRoles'
// 修改密码
export const SET_USER_PASSWORD = api + '/admin-api/manage/user/updateUserPassword'
// 修改账号信息
export const SET_USER_INFO = api + '/admin-api/manage/user/updateUserInfo'
// 删除账号信息
export const DEL_USER = api + '/admin-api/manage/user/deleteUserInfo'
// 创建账号信息
export const CREAT_NEW_ACCOUNT = api + '/admin-api/manage/user/addUserInfo'
// 获取账号列表
export const GET_USER_LIST_DATA = api + '/admin-api/manage/user/userList'
// 获取管家列表
export const GET_ADMIN_LIST_DATA = api + '/admin-api/manage/customer/houseKeepers'
// 获取客户列表
export const GET_CLIENT_LIST_DATA = api + '/admin-api/manage/customer/customerList'
// 创建管家
export const CREAT_ADMIN = api + '/admin-api/manage/customer/addKeeper'
// 创建客户信息
export const CREAT_CLIENT = api + '/admin-api/manage/customer/customerCreate'
// 修改客户信息
export const MODIFY_CLIENT = api + '/admin-api/manage/customer/customerUpdate'
// 获取账单结算列表
export const GET_BILL_LIST = api + '/admin-api/manage/finance/customerBillList'
// 账单结算确认
export const CONFIRM_BILL_CLEAN = api + '/admin-api/manage/finance/customerBillPay'
// 客户账户余额列表
export const GET_CLIENT_BALANCE_LIST = api + '/admin-api/manage/finance/customerBalanceList'
// 预付款管理列表
export const GET_PAYMENT_LIST = api + '/admin-api/manage/finance/payMoneyList'
// 预付款增加
export const SUBMIT_ADD_PAYMENT = api + '/admin-api/manage/finance/addPayMoney'
// 查询客户 一个
export const QUERY_CLIENT = api + '/admin-api/manage/customer/findCustomer'
// 查询客户 多个
export const QUERY_CLIENT_LIST = api + '/admin-api/manage/customer/findCustomerList'
// 客户额度调整列表
export const QUERY_CREDIT_MONEY_LIST = api + '/admin-api/manage/finance/creditMoneyList'
// 额度调整提交
export const SUBMIT_ADD_CREDIT = api + '/admin-api/manage/finance/addCreditMoney'
// 查询订单列表
export const QUERY_ORDER_LIST = api + '/admin-api/manage/order/orderList'
// 导出订单列表
export const EXPORT_ORDER_LIST = api + '/admin-api/manage/order/exportOrder'
// 添加录入订单
export const SUBMIT_ADD_ORDER_ENTRY = api + '/admin-api/manage/order/entryOrder'
// 查询管家
export const QUERY_BUTLER = api + "/admin-api/manage/customer/customerUsers"
// 上传图片
export const UPLOAD_IMG = api + "/admin-api/manage/customer/uploadfile"
// 停/启用客户
export const SET_CUSTOMER_STATUS = api + "/admin-api/manage/customer/setCustomerStatus"
// 客户可用企业列表
export const QUERY_COMPANYS = api + "/admin-api/manage/customer/companys"
// 域名预算报告-管理
export const QUERY_BUDGET_REPORT_MANAGE = api + "/admin-api/manage/report/budgetReportManage"

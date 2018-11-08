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
export const GET_CLIENT_LIST_DATA = api + '/admin-api/manage/customer/userCustomers'
// 创建管家
export const CREAT_ADMIN = api + '/admin-api/manage/customer/addKeeper'
// 创建修改客户信息
export const CREAT_AND_MODIFY_CLIENT = api + '/admin-api/manage/customer/customerCreate'
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
// 查询企业名称/客户ID
export const QUERY_CLIENT = api + '/admin-api/manage/customer/customerCreate'
// 客户额度调整列表
export const QUERY_CREDIT_MONEY_LIST = api + '/admin-api/manage/finance/creditMoneyList'
// 额度调整提交
export const SUBMIT_ADD_CREDIT = api + '/admin-api/manage/finance/addCreditMoney'
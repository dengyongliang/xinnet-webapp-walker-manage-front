export default [
  {
    path: 'finance',
    name: 'payment',
    redirect: 'finance/payment'
  },
  {
    path: 'finance/payment',
    name: 'payment',
    component (resolve) {
      return require(['@/modular/finance/paymentAdd'], resolve)
    },
    meta: {
      title: '预付款增加管理'
    }
  },
  {
    path: 'finance/balance',
    name: 'balance',
    component (resolve) {
      return require(['@/modular/finance/balanceQuery'], resolve)
    },
    meta: {
      title: '客户账户余额查询'
    }
  },
  {
    path: 'finance/bill',
    name: 'bill',
    component (resolve) {
      return require(['@/modular/finance/billClean'], resolve)
    },
    meta: {
      title: '账单结算'
    }
  },
  {
    path: 'finance/credit',
    name: 'credit',
    component (resolve) {
      return require(['@/modular/finance/addCredit'], resolve)
    },
    meta: {
      title: '客户额度调整'
    }
  }
]

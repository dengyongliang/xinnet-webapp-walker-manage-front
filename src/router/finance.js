export default {
  path: '/finance',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'payment',
      component (resolve) {
        return require(['@/modular/finance/paymentAdd'], resolve)
      },
      meta: {
        title: '预付款增加管理'
      }
    },
    {
      path: 'payment',
      name: 'payment',
      component (resolve) {
        return require(['@/modular/finance/paymentAdd'], resolve)
      },
      meta: {
        title: '预付款增加管理'
      }
    },
    {
      path: 'balance',
      name: 'balance',
      component (resolve) {
        return require(['@/modular/finance/balanceQuery'], resolve)
      },
      meta: {
        title: '客户账户余额查询'
      }
    },
    {
      path: 'bill',
      name: 'bill',
      component (resolve) {
        return require(['@/modular/finance/billClean'], resolve)
      },
      meta: {
        title: '账单结算'
      }
    },
    {
      path: 'credit',
      name: 'credit',
      component (resolve) {
        return require(['@/modular/finance/addCredit'], resolve)
      },
      meta: {
        title: '客户额度调整'
      }
    }
  ]
}

export default [
  {
    path: 'order',
    name: 'order_mgmt',
    redirect: 'order/mgmt'
  },
  {
    path: 'order/mgmt',
    name: 'order_mgmt',
    component (resolve) {
      return require(['@/modular/order/orderMgmt'], resolve)
    },
    meta: {
      title: '订单管理'
    }
  },
  {
    path: 'order/entry',
    name: 'order_entry',
    component (resolve) {
      return require(['@/modular/order/orderEntry'], resolve)
    },
    meta: {
      title: '订单录入'
    }
  }
]

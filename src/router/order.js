export default {
  path: '/order',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'order_mgmt',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'mgmt',
      name: 'order_mgmt',
      component (resolve) {
        return require(['@/modular/order/orderMgmt'], resolve)
      },
      meta: {
        title: '订单管理'
      }
    },
    {
      path: 'entry',
      name: 'order_entry',
      component (resolve) {
        return require(['@/modular/order/orderEntry'], resolve)
      },
      meta: {
        title: '订单录入'
      }
    }
  ]
}

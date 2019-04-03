export default {
  path: '/customer',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'customer_mgmt',
      component (resolve) {
        return require(['@/modular/customer/clientMgmt'], resolve)
      },
      meta: {
        title: '客户管理'
      }
    },
    {
      path: 'mgmt',
      name: 'customer_mgmt',
      component (resolve) {
        return require(['@/modular/customer/clientMgmt'], resolve)
      },
      meta: {
        title: '客户管理'
      }
    }
  ]
}

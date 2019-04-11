export default [
  {
    path: 'customer',
    name: 'customer_mgmt',
    redirect: 'customer/mgmt'
  },
  {
    path: 'customer/mgmt',
    name: 'customer_mgmt',
    component (resolve) {
      return require(['@/modular/customer/clientMgmt'], resolve)
    },
    meta: {
      title: '客户管理'
    }
  }
]

export default {
  path: '/client',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'client_mgmt',
      component (resolve) {
        return require(['@/modular/client/clientMgmt'], resolve)
      },
      meta: {
        title: '客户管理'
      }
    },
    {
      path: 'mgmt',
      name: 'client_mgmt',
      component (resolve) {
        return require(['@/modular/client/clientMgmt'], resolve)
      },
      meta: {
        title: '客户管理'
      }
    },
    {
      path: 'account',
      name: 'client_account',
      component (resolve) {
        return require(['@/modular/client/clientAccount'], resolve)
      },
      meta: {
        title: '客户账号管理'
      }
    }
  ]
}

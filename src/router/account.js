export default {
  path: '/account',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'account_my',
      component (resolve) {
        return require(['@/modular/account/accountMy'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'my',
      name: 'account_my',
      component (resolve) {
        return require(['@/modular/account/accountMy'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'mgmt',
      name: 'account_mgmt',
      component (resolve) {
        return require(['@/modular/account/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理'
      }
    }
  ]
}

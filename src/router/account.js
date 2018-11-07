export default {
  path: '/account',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: 'my',
      name: 'ACCOUNT_MY',
      component (resolve) {
        return require(['@/modular/accountMy'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'mgmt',
      name: 'ACCOUNT_MGMT',
      component (resolve) {
        return require(['@/modular/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理'
      }
    }
  ]
}
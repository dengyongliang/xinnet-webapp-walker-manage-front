export default {
  path: '/user',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'user_my',
      component (resolve) {
        return require(['@/modular/user/accountMy'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'my',
      name: 'user_my',
      component (resolve) {
        return require(['@/modular/user/accountMy'], resolve)
      },
      meta: {
        title: '我的账号'
      }
    },
    {
      path: 'mgmt',
      name: 'user_mgmt',
      component (resolve) {
        return require(['@/modular/user/accountMgmt'], resolve)
      },
      meta: {
        title: '账号管理'
      }
    }
  ]
}

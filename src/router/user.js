export default [
  {
    path: 'user',
    name: 'user_my',
    redirect: 'user/my'
  },
  {
    path: 'user/my',
    name: 'user_my',
    component (resolve) {
      return require(['@/modular/user/accountMy'], resolve)
    },
    meta: {
      title: '我的账号'
    }
  },
  {
    path: 'user/mgmt',
    name: 'user_mgmt',
    component (resolve) {
      return require(['@/modular/user/accountMgmt'], resolve)
    },
    meta: {
      title: '账号管理'
    }
  }
]

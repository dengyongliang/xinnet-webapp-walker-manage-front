export default [
  {
    path: 'focus',
    name: 'focus_mgmt',
    redirect: 'focus/mgmt'
  },
  {
    path: 'focus/mgmt',
    name: 'focus_mgmt',
    component (resolve) {
      return require(['@/modular/focus/focusMgmt'], resolve)
    },
    meta: {
      title: '关注域名信息'
    }
  }
]

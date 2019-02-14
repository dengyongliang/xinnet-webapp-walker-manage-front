export default {
  path: '/service',
  component (resolve) {
    return require(['@/page/main'], resolve)
  },
  children: [
    {
      path: '/',
      name: 'butler_mgmt',
      component (resolve) {
        return require(['@/modular/service/butlerMgmt'], resolve)
      },
      meta: {
        title: '管家管理'
      }
    },
    {
      path: 'butler',
      name: 'butler_mgmt',
      component (resolve) {
        return require(['@/modular/service/butlerMgmt'], resolve)
      },
      meta: {
        title: '管家管理'
      }
    },
    {
      path: 'budget',
      name: 'budget_mgmt',
      component (resolve) {
        return require(['@/modular/service/budget'], resolve)
      },
      meta: {
        title: '提交预算报告'
      }
    },
    {
      path: 'worklist',
      name: 'worklist',
      component (resolve) {
        return require(['@/modular/service/worklist'], resolve)
      },
      meta: {
        title: '工单管理'
      }
    }
  ]
}

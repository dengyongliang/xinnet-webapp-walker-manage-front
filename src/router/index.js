import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

Vue.use(Router)

const RouterMain = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: '404',
      component (resolve) {
        return require(['@/page/404'], resolve)
      },
      meta: {
        title: '404'
      }
    },
    {
      path: '/login',
      name: 'LOGIN',
      component (resolve) {
        return require(['@/page/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'MAIN',
      component (resolve) {
        return require(['@/page/main'], resolve)
      },
      meta: {
        // title: GLOBAL.TITLE
      },
      children: [
        {
          path: '/',
          name: 'ACCOUNT_MY',
          component (resolve) {
            return require(['@/modular/account/accountMy'], resolve)
          },
          meta: {
            title: '我的账号'
          }
        },
        {
          path: 'account/my',
          name: 'ACCOUNT_MY',
          component (resolve) {
            return require(['@/modular/account/accountMy'], resolve)
          },
          meta: {
            title: '我的账号'
          }
        },
        {
          path: 'account/mgmt',
          name: 'ACCOUNT_MGMT',
          component (resolve) {
            return require(['@/modular/account/accountMgmt'], resolve)
          },
          meta: {
            title: '账号管理'
          }
        },
        {
          path: 'client/client',
          name: 'CLIENT_MGMT',
          component (resolve) {
            return require(['@/modular/client/clientMgmt'], resolve)
          },
          meta: {
            title: '客户管理'
          }
        },
        {
          path: 'client/clientAccount',
          name: 'CLIENT_ACCOUNT',
          component (resolve) {
            return require(['@/modular/client/clientAccount'], resolve)
          },
          meta: {
            title: '客户账号管理'
          }
        },
        {
          path: 'order/mgmt',
          name: 'ORDER_MGMT',
          component (resolve) {
            return require(['@/modular/order/orderMgmt'], resolve)
          },
          meta: {
            title: '订单管理'
          }
        },
        {
          path: 'order/entry',
          name: 'ORDER_ENTRY',
          component (resolve) {
            return require(['@/modular/order/orderEntry'], resolve)
          },
          meta: {
            title: '订单录入'
          }
        },
        {
          path: 'finance/add',
          name: 'PAY_ADD',
          component (resolve) {
            return require(['@/modular/finance/paymentAdd'], resolve)
          },
          meta: {
            title: '预付款增加管理'
          }
        },
        {
          path: 'finance/query',
          name: 'PAY_QUERY',
          component (resolve) {
            return require(['@/modular/finance/paymentQuery'], resolve)
          },
          meta: {
            title: '预付款查询'
          }
        },
        {
          path: 'finance/bill',
          name: 'PAY_BILL',
          component (resolve) {
            return require(['@/modular/finance/billClean'], resolve)
          },
          meta: {
            title: '账单结算'
          }
        },
        {
          path: 'service/butler',
          name: 'BUTLER_MGMT',
          component (resolve) {
            return require(['@/modular/service/butlerMgmt'], resolve)
          },
          meta: {
            title: '管家管理'
          }
        },
        {
          path: 'service/worklist',
          name: 'WORK_LIST',
          component (resolve) {
            return require(['@/modular/service/worklist'], resolve)
          },
          meta: {
            title: '工单管理'
          }
        },
      ]
    }
  ],
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
RouterMain.beforeEach((to, from, next) => {
  NProgress.start()
  window.document.title = to.meta.title
  next()
})
RouterMain.afterEach(transition => {
  NProgress.done()
})
export default RouterMain

import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import user from './user'
import customer from './customer'
import order from './order'
import finance from './finance'
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
          name: 'user_my',
          component (resolve) {
            return require(['@/modular/user/accountMy'], resolve)
          },
          meta: {
            title: '我的账号'
          }
        },
        {
          path: 'butler',
          name: 'butler_mgmt',
          component (resolve) {
            return require(['@/modular/butlerMgmt'], resolve)
          },
          meta: {
            title: '管家管理'
          }
        },
        {
          path: 'budget',
          name: 'budget_mgmt',
          component (resolve) {
            return require(['@/modular/budget'], resolve)
          },
          meta: {
            title: '提交预算报告'
          }
        },
        {
          path: 'worklist',
          name: 'worklist',
          component (resolve) {
            return require(['@/modular/worklist'], resolve)
          },
          meta: {
            title: '工单管理'
          }
        },
        ...customer,
        ...finance,
        ...order,
        ...user
      ]
    }
    // user
    // customer,
    // order
    // finance
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

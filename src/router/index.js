import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import account from './account'
import client from './client'
import order from './order'
import finance from './finance'
import service from './service'
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
          name: 'account_my',
          component (resolve) {
            return require(['@/modular/account/accountMy'], resolve)
          },
          meta: {
            title: '我的账号'
          }
        }
      ]
    },
    account,
    client,
    order,
    finance,
    service
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

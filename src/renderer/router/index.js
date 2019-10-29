import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      name: 'login',
      component: require('@/view/login').default
    },
    {
      path: '/admin',
      name: 'admin',
      component: require('@/view/admin').default,
      children: [
        {
          path: 'userManager',
          component: require('@/components/admin/userManager').default
        },
        {
          path: 'LotterySetting',
          component: require('@/components/admin/LotterySetting').default
        },
        {
          path: 'PastDraw',
          component: require('@/components/admin/PastDraw').default
        }
      ]
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: require('@/view/lottery').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

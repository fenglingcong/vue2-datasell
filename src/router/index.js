import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from '@/pages/index'
import DetailPage from '@/pages/detail'
import OrderListPage from '@/pages/orderList'
import DetailAanPage from '@/pages/detail/analysis'
import DetailCouPage from '@/pages/detail/count'
import DetailForPage from '@/pages/detail/forecast'
import DetailPubPage from '@/pages/detail/publish'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: 'detail/count',
      children: [
        {
          path: 'analysis',
          component: DetailAanPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})

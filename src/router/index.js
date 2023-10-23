import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../page/login/Login.vue')
  },
  {
    //
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '../page/index/index.vue'),
    children: [//嵌套路由
      {
        path: '/userpage',
        name: 'userpage',
        component: () => import(/* webpackChunkName: "user" */ '@/page/userpage/user.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../page/order/order.vue')
      },
    ]
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

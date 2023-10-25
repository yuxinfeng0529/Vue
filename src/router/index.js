import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../page/login/Login.vue')
  },
  {
    //
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "Index" */ '../page/index/index.vue'),
    children: [//嵌套路由
      // 用户列表
      {
        path: '/userpage',
        name: 'userpage',
        component: () => import(/* webpackChunkName: "Userpage" */ '@/page/userpage/user.vue')
      },
      //订单管理
      {
        path: '/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "Order" */ '../page/order/order.vue')
      },
      //菜品管理
      {
        path: '/dishes',
        name: 'dishes',
        component: () => import(/* webpackChunkName: "Dishes" */ '../page/dishes/dishes.vue')
      },
      //添加菜品
      {
        path: '/dishesupload',
        name: 'dishesupload',
        component: () => import(/* webpackChunkName: "Dishesupload" */ '../page/dishesupload/dishesupload.vue')
      },
      // 员工管理
      {
        path:'/role',
        name:'role',
        component: () => import(/* webpackChunkName: "Role" */ '../page/role/role.vue')
      }
    ]
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

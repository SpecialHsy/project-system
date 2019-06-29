import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'

// 路由文件
const login = () => import('@/components/login/login.vue')
const home = () => import('@/components/home/home.vue')
const users = () => import('@/components/user/users.vue')
const power = () => import('@/components/power/power.vue')
const roles = () => import('@/components/roles/roles.vue')
const categories = () => import('@/components/categories/categories.vue')
const goods = () => import('@/components/goods/goods.vue')
const goodsAdd = () => import('@/components/goodsAdd/goodsAdd.vue')
const orders = () => import('@/components/orders/orders.vue')
const reports = () => import('@/components/reports/reports.vue')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login', // 别名
      component: login
    },
    {
      path: '/home',
      name: 'home', // 别名
      component: home,
      children: [
        {
          path: '/users',
          name: 'user', // 别名
          component: users
        },
        {
          path: '/rights',
          name: 'power', // 别名
          component: power
        },
        {
          path: '/roles',
          name: 'roles', // 别名
          component: roles
        },
        {
          path: '/categories',
          name: 'categories', // 别名
          component: categories
        },
        {
          path: '/goods',
          name: 'goods', // 别名
          component: goods
        },
        {
          path: '/goodsAdd',
          name: 'goodsAdd', // 别名
          component: goodsAdd
        },
        {
          path: '/orders',
          name: 'orders', // 别名
          component: orders
        },
        {
          path: '/reports',
          name: 'reports', // 别名
          component: reports
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // to要去的路由对象
  // from离开的路由对象
  // next后续代码
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      Message({
        message: '您还没有登录，请先登录',
        type: 'error'
      })
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

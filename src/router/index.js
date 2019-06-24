import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import users from '@/components/user/users.vue'
import power from "../components/power/power.vue"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/', redirect: '/home'
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
          path: '/power',
          name: 'power', // 别名
          component: power
        }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // to要去的路由对象
  // from离开的路由对象
  // next后续代码
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    if (!token) { 
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

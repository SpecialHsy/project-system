import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import users from '@/components/user/users.vue'

Vue.use(Router)

export default new Router({
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
      ]
    }
  ]
})

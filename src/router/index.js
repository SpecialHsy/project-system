import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login', // 别名
      component: login
    },
    {
      path: '/',
      name: 'home', // 别名
      component: home
    }
  ]
})

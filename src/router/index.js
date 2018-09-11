import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../../api/firebase'

import HelloWorld from '@/pages/HelloWorld'
import User from '@/pages/User'
import Signup from '@/pages/Signup'
import Signin from '@/pages/Signin'
import Dashboard from '@/pages/Dashboard'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: 'user/:name',
          component: User
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/signin' && to.path !== '/signup') {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        // User is signed out.
        router.push('/signin')
      }

      next()
    })
  } else {
    next()
  }
})

export default router

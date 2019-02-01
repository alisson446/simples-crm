import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { auth } from '../../api/firebase'

import Signup from '@/pages/Signup/index'
import Signin from '@/pages/Signin/index'
import Dashboard from '@/pages/Dashboard/index'

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
    }
  ]
})

// Check if user is authenticated in each route
router.beforeEach((to, from, next) => {
  if (to.path !== '/signin' && to.path !== '/signup') {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        // User is signed out.
        router.push('/signin')
      } else {
        store.state.Dashboard.authUserId = user.uid
        next()
      }
    })
  } else {
    next()
  }
})

export default router

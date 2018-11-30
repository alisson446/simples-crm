import { FB_SIGNIN, SIGNIN, USER_LOGGED } from '../constants'
import { db } from '../../../api/firebase'
import router from '@/router'

import signin from './_signin'

export default {
  state: {
    userAccount: null,
    userLogged: false,
    checking: false,
    loginError: false
  },
  mutations: {
    [USER_LOGGED] (state, payload) {
      state.userAccount = payload.userOrEmail
      state.userLogged = true
      state.checking = false

      router.push('/')
    }
  },
  actions: {
    [FB_SIGNIN] (context, payload) {
      signin(context, payload)
    },
    [SIGNIN] ({ dispatch, state }, payload) {
      const { userOrEmail, password } = payload
      state.checking = true
      state.loginError = false

      if (!userOrEmail.includes('@')) {
        db.collection('users').where('userAccount', '==', userOrEmail).get()
          .then(function (docs) {
            const users = docs.docs

            if (users.length) {
              const user = users[0].data()
              dispatch('FB_SIGNIN', { email: user.email, password })
            } else {
              state.checking = false
              state.loginError = true
            }
          })
      } else {
        dispatch('FB_SIGNIN', { email: userOrEmail, password })
      }
    }
  }
}

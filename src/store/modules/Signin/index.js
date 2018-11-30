import { FB_SIGNIN, SIGNIN, USER_LOGGED } from '../../constants'
import router from '@/router'

import fbSignin from './fbSignin'
import signin from './signin'

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
    [FB_SIGNIN]: fbSignin,
    [SIGNIN]: signin
  }
}

import { SIGNIN } from '../actions'
import { USER_LOGGED } from '../mutations'
import { auth } from '../../../api/firebase'

export default {
  state: {
    userAccount: null,
    userLogged: false,
    checking: false
  },
  mutations: {
    [USER_LOGGED] (state, payload) {
      state.userAccount = payload.userOrEmail
      state.userLogged = true
      state.checking = false
    }
  },
  actions: {
    [SIGNIN] ({ commit, state }, payload) {
      const { userOrEmail, password } = payload
      state.checking = true

      // Checking authentication
      auth.signInWithEmailAndPassword(userOrEmail, password)
        .then(function () {
          commit(USER_LOGGED, payload)
        })
        .catch(function (error) {
          // Handle Errors here.
          console.error(error.code)
          console.error(error.code)
          state.checking = false
        })
    }
  }
}

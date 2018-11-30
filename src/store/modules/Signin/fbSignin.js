import { auth } from '../../../../api/firebase'
import { USER_LOGGED } from '../../constants'

export default function fbSignin ({ commit, state }, payload) {
  const { email, password } = payload

  // Checking authentication
  return auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      commit(USER_LOGGED, payload)
    })
    .catch(function (error) {
      // Handle Errors here.
      console.error(error.code)
      console.error(error.message)
      state.checking = false
      state.loginError = true
    })
}

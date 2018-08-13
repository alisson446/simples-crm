import { SIGNIN } from '../actions'
import { USER_CREATED } from '../mutations'
import { auth, db } from '../../../api/firebase'

export default {
  state: {
    authUserId: null,
    userAccount: null,
    userName: null,
    userEmail: null,
    userAccountExists: false,
    emailExists: false,
    userSaved: false,
    sending: false
  },
  mutations: {
    [USER_CREATED] (state, payload) {
      state.authUserId = payload.authUserId
      state.userAccount = payload.userAccount
      state.userName = payload.userName
      state.userEmail = payload.userEmail
      state.userSaved = true
      state.sending = false
    }
  },
  actions: {
    [SIGNIN] ({ commit, state }, payload) {
      const { userAccount, name, email, password } = payload
      state.sending = true

      // Authentication
      auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          const authUserId = auth.currentUser.uid

          // Creating user in database
          db.doc(`users/${authUserId}`).set({
            userAccount,
            name,
            email,
            password
          })
            .then(function () {
              commit(USER_CREATED, payload)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
              state.sending = false
            })
        })
        .catch(function (error) {
          // Handle Errors here.
          console.error(error.code)
          console.error(error.message)
          state.sending = false
        })
    }
  }
}

import { SIGNUP } from '../actions'
import { USER_CREATED } from '../mutations'
import { auth, db } from '../../../api/firebase'

export default {
  state: {
    authUserId: null,
    userName: null,
    userEmail: null,
    userSaved: false,
    sending: false
  },
  mutations: {
    [USER_CREATED] (state, payload) {
      state.authUserId = payload.authUserId
      state.userName = payload.userName
      state.userEmail = payload.userEmail
      state.userSaved = true
      state.sending = false
    }
  },
  actions: {
    [SIGNUP] ({ commit, state }, payload) {
      const { fullName, email, password } = payload
      state.sending = true

      // Authentication
      auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          const authUserId = auth.currentUser.uid

          // Creating user in database
          db.doc(`users/${authUserId}`).set({
            name: fullName,
            email,
            password
          })
            .then(function () {
              console.log('Document written with ID: ', authUserId)
              commit(USER_CREATED, { authUserId, name, email })
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
              state.sending = false
            })
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log(error.code)
          console.log(error.message)
          state.sending = false
        })
    }
  }
}

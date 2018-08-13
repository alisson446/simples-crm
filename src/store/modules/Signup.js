import { SIGNUP, CHECK_FIELD_VALUE_EXISTS } from '../actions'
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
    [CHECK_FIELD_VALUE_EXISTS] ({ state }, payload) {
      const { field, value } = payload

      db.collection('users').where(field, '==', value).get()
        .then(function (docs) {
          state[`${field}Exists`] = false

          docs.forEach(function (doc) {
            state[`${field}Exists`] = doc.exists
          })
        })
        .catch(function (error) {
          console.error('Error getting documents: ', error)
          state[`${field}Exists`] = false
        })
    },
    [SIGNUP] ({ commit, state }, payload) {
      const { userAccount, name, email, password } = payload
      state.sending = true

      return new Promise((resolve, reject) => {
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
                resolve()
              })
              .catch(function (error) {
                console.error('Error adding document: ', error)
                state.sending = false
                reject(error)
              })
          })
          .catch(function (error) {
            // Handle Errors here.
            console.error(error.code)
            console.error(error.message)
            state.sending = false
            reject(error)
          })
      })
    }
  }
}

import {
  SIGNUP,
  CHECK_FIELD_VALUE_EXISTS,
  USER_CREATED
} from '../constants'
import { auth, db } from '../../../api/firebase'

export default {
  state: {
    authUserId: null,
    userAccount: null,
    userName: null,
    userEmail: null,
    userAccountExists: false,
    userAccountInvalided: false,
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
    [CHECK_FIELD_VALUE_EXISTS]: function ({ state }, payload) {
      const { field, value } = payload
      state.userAccountInvalided = false

      return new Promise((resolve, reject) => {
        // Check if userAccount value contains invalid characters
        if (field === 'userAccount' && value.includes('@')) {
          state.userAccountInvalided = true
          resolve()
        }

        // Check if field value exists in users collection
        db.collection('users').where(field, '==', value).get()
          .then(function (docs) {
            state[`${field}Exists`] = false

            docs.forEach(function (doc) {
              state[`${field}Exists`] = doc.exists
            })

            resolve()
          })
          .catch(function (error) {
            console.error('Error getting documents: ', error)
            state[`${field}Exists`] = false
            reject(error)
          })
      })
    },
    [SIGNUP] ({ commit, state }, payload) {
      const { userAccount, name, company, email, password } = payload
      state.sending = true

      return new Promise((resolve, reject) => {
        // Creating authentication token
        auth.createUserWithEmailAndPassword(email, password)
          .then(function () {
            const authUserId = auth.currentUser.uid
            const fullPayload = { ...payload, authUserId }

            // Creating user in database
            db.doc(`users/${authUserId}`).set({
              userAccount,
              name,
              company,
              email,
              password
            })
              .then(function () {
                commit(USER_CREATED, fullPayload)
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

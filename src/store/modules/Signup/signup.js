import { auth, db } from '../../../../api/firebase'
import { USER_CREATED } from '../../constants'

export default function signup ({ commit, state }, payload) {
  const { userAccount, name, email, password } = payload
  state.sending = true

  return new Promise((resolve, reject) => {
    // Creating authentication token

    auth.createUserWithEmailAndPassword(email, password)
      .then(function (userCreated) {
        const authUserId = userCreated.uid
        const fullPayload = { ...payload, authUserId }

        // Creating user in database
        db.doc(`users/${authUserId}`).set({
          userAccount,
          name,
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

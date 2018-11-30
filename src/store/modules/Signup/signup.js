import { secondaryApp, db } from '../../../../api/firebase'
import { USER_CREATED } from '../../constants'

export default function signup ({ commit, state }, payload) {
  const { userAccount, name, company, email, password } = payload
  state.sending = true

  return new Promise((resolve, reject) => {
    // Creating authentication token
    const secondaryAuth = secondaryApp.auth()

    secondaryAuth.createUserWithEmailAndPassword(email, password)
      .then(function (userCreated) {
        const authUserId = userCreated.uid
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
            secondaryAuth.signOut()
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

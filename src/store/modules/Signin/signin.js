import { FB_SIGNIN } from '../../constants'
import { db } from '../../../../api/firebase'

export default function signin ({ dispatch, state }, payload) {
  const { userOrEmail, password } = payload
  state.checking = true
  state.loginError = false

  if (!userOrEmail.includes('@')) {
    db.collection('users').where('userAccount', '==', userOrEmail).get()
      .then(function (docs) {
        const users = docs.docs

        if (users.length) {
          const user = users[0].data()
          dispatch(FB_SIGNIN, { email: user.email, password })
        } else {
          state.checking = false
          state.loginError = true
        }
      })
  } else {
    dispatch(FB_SIGNIN, { email: userOrEmail, password })
  }
}

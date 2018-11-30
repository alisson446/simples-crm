import { db } from '../../../../api/firebase'

export default function getAuthUser ({ state }) {
  db.collection('users').doc(state.authUserId).get()
    .then(function (snap) {
      state.authUser = snap.data()
    })
}

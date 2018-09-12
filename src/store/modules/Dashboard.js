import { auth, db } from '../../../api/firebase'
import { FETCH_FILES, SIGNOUT } from '../constants'
import router from '@/router'

export default {
  state: {
    userFiles: [],
    hasFiles: false
  },
  mutations: {},
  actions: {
    [FETCH_FILES] ({ state }) {
      db.collection('files').get()
        .then(function (docs) {
          docs.forEach(function (doc) {
            if (doc.data().name) {
              state.userFiles.push({
                id: doc.id,
                ...doc.data()
              })
            }
          })
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    [SIGNOUT] () {
      auth.signOut().then(function () {
        router.push('/signin')
      })
    }
  }
}

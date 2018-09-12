import { auth, db } from '../../../api/firebase'
import { FETCH_FILES, SIGNOUT } from '../constants'
import router from '@/router'

export default {
  state: {
    userFiles: [],
    hasFiles: false,
    loadingFiles: false
  },
  mutations: {},
  actions: {
    [FETCH_FILES] ({ state }) {
      state.userFiles = []
      state.loadingFiles = true

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

          state.loadingFiles = false
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

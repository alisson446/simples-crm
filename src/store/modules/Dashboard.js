import { auth, db } from '../../../api/firebase'
import { ON_CHECKING_FILES, SIGNOUT } from '../constants'
import router from '@/router'

export default {
  state: {
    userFiles: [],
    loadingFiles: false
  },
  mutations: {},
  actions: {
    [ON_CHECKING_FILES] ({ state }) {
      state.userFiles = []
      state.loadingFiles = true

      db.collection('files')
        .onSnapshot(function (docs) {
          docs.docChanges.forEach(function (change) {
            const { doc, type } = change

            switch (type) {
              case 'added':
                if (doc.data().name) {
                  state.userFiles.push({ id: doc.id, ...doc.data() })
                }
                break
              case 'removed':
                break
            }
          })

          state.loadingFiles = false
        })
    },
    [SIGNOUT] () {
      auth.signOut().then(function () {
        router.push('/signin')
      })
    }
  }
}

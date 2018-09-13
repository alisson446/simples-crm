import { auth, db, storageRef } from '../../../api/firebase'
import { ON_CHECKING_FILES, DELETE_FILE, SIGNOUT } from '../constants'
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
                const fileIndex = state.userFiles.findIndex((file) => file.id === doc.id)
                if (fileIndex > -1) {
                  state.userFiles.splice(fileIndex, 1)
                }
                break
            }
          })

          state.loadingFiles = false
        })
    },
    [DELETE_FILE] ({ state }, fileId) {
      storageRef.child(`files/${fileId}`).delete()
        .then(function () {
          db.collection('files').doc(fileId).delete()
            .catch(console.error)
        })
        .catch(console.error)
    },
    [SIGNOUT] () {
      auth.signOut().then(function () {
        router.push('/signin')
      })
    }
  }
}

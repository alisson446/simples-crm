import { db } from '../../../../api/firebase'

export default function onCheckingFiles ({ state }) {
  state.loadingFiles = true

  db.collection('users').doc(state.authUserId).collection('files')
    .onSnapshot(function (docs) {
      state.userFiles = []
      if (docs.docChanges.length === 0) state.loadingFiles = false

      docs.docChanges.forEach(function (change) {
        const { doc, type } = change

        switch (type) {
          case 'added':
            db.collection('files').doc(doc.id).get()
              .then(function (fileSnap) {
                state.userFiles.push({ id: doc.id, ...fileSnap.data() })
                state.loadingFiles = false
              })
            break
          case 'removed':
            const fileIndex = state.userFiles.findIndex((file) => file.id === doc.id)
            if (fileIndex > -1) {
              state.userFiles.splice(fileIndex, 1)
            }
            break
        }
      })
    })
}

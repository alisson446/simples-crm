import { db } from '../../../../api/firebase'

export default function shareFile ({ state }, payload) {
  const { fileId, email } = payload
  state.sharedWithSuccess = false

  db.collection('users').where('email', '==', email).get()
    .then(function (docsSnap) {
      const { docs } = docsSnap

      if (docs.length) {
        const receiverId = docs[0].id

        db.collection('users').doc(receiverId).collection('files').doc(fileId)
          .set({ permissionLevel: 'writer' })

          .then(function () {
            return db.collection('files').doc(fileId).collection('followers').doc(receiverId)
              .set({ permissionlevel: 'owner' })
          })
          .then(() => {
            state.sharedWithSuccess = true
            setTimeout(() => { state.sharedWithSuccess = false }, 4000)
          })
      }
    })
}

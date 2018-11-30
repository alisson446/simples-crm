import { db, storageRef } from '../../../../api/firebase'

export default function deleteFile ({ state }, fileId) {
  storageRef.child(`files/${fileId}`).delete()
    .then(function () {
      db.collection('files').doc(fileId).collection('followers').get()
        .then(function (docsSnap) {
          const followers = docsSnap.docs

          if (followers.length) {
            followers.forEach(function (follower) {
              db.collection('users').doc(follower.id).collection('files').doc(fileId).delete()
                .then(() => {
                  db.collection('files').doc(fileId).collection('followers').doc(follower.id).delete()
                })
                .catch(console.error)
            })
          }
        })
        .then(() => db.collection('files').doc(fileId).delete())
        .then(() => {
          state.deletedWithSuccess = true
          setTimeout(() => { state.deletedWithSuccess = false }, 4000)
        })
        .catch(console.error)
    })
    .catch(console.error)
}

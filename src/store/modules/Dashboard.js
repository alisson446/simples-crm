import { auth, db, storageRef } from '../../../api/firebase'
import {
  UPLOAD_FILE,
  ON_CHECKING_FILES,
  DELETE_FILE,
  SIGNOUT
} from '../constants'
import router from '@/router'

export default {
  state: {
    userFiles: [],
    loadingFiles: false,
    authUserId: null
  },
  mutations: {},
  actions: {
    [UPLOAD_FILE] ({ state }, file) {
      const blobFile = new Blob(
        [file],
        { type: file.type }
      )

      // Create a file document reference to use in upload and store metadata
      const fileDoc = db.collection('files').doc()
      const uploadTask = storageRef.child(`files/${fileDoc.id}`).put(blobFile)

      uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      }, function (error) {
        console.error(error)
      }, function () {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getMetadata().then(function (snapshot) {
          fileDoc.set({
            name: file.name,
            type: snapshot.contentType,
            downloadUrl: snapshot.downloadURLs[0],
            size: snapshot.size,
            postedIn: snapshot.timeCreated
          })
            .then(function () {
              const payload = { [fileDoc.id]: 'owner' }
              const fileFollowerRef = db.collection('fileFollowers').doc(state.authUserId)

              db.runTransaction(function (transaction) {
                return transaction.get(fileFollowerRef).then(function (docSnap) {
                  if (!docSnap.exists) {
                    transaction.set(fileFollowerRef, payload)
                  } else {
                    transaction.update(fileFollowerRef, payload)
                  }
                })
              })
            })
        })
      })
    },
    [ON_CHECKING_FILES] ({ state }) {
      state.loadingFiles = true

      db.collection('fileFollowers').doc(state.authUserId)
        .onSnapshot(function (docs) {
          state.loadingFiles = true
          state.userFiles = []

          const files = docs.data()
          const fileIds = Object.keys(files)

          fileIds.forEach(function (fileId, key) {
            db.collection('files').doc(fileId).get()
              .then(function (fileSnap) {
                state.userFiles.push({ id: fileId, ...fileSnap.data() })

                if (key + 1 === fileIds.length) {
                  state.loadingFiles = false
                }
              })
          })
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

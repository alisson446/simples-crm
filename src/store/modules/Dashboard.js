import { auth, db, storageRef } from '../../../api/firebase'
import {
  UPLOAD_FILE,
  ON_CHECKING_FILES,
  SHARE_FILE,
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
              db.collection('users').doc(state.authUserId).collection('files').doc(fileDoc.id)
                .set({ permissionlevel: 'owner' })
            })
        })
      })
    },
    [ON_CHECKING_FILES] ({ state }) {
      state.userFiles = []
      state.loadingFiles = true

      db.collection('users').doc(state.authUserId).collection('files')
        .onSnapshot(function (docs) {
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
    },
    [SHARE_FILE] ({ state }, payload) {
      const { fileId, email } = payload

      db.collection('users').where('email', '==', email).get()
        .then(function (docsSnap) {
          const { docs } = docsSnap

          if (docs.length) {
            const receiverId = docs[0].id

            db.collection('users').doc(receiverId).collection('files').doc(fileId)
              .set({ permissionLevel: 'writer' })
          }
        })
    },
    [DELETE_FILE] ({ state }, fileId) {
      storageRef.child(`files/${fileId}`).delete()
        .then(function () {
          db.collection('files').doc(fileId).delete()
            .then(function () {
              db.collection('users').doc(state.authUserId).collection('files').doc(fileId).delete()
                .catch(console.error)
            })
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

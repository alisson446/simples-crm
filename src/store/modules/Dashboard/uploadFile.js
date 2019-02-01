import moment from 'moment'
import { db, storageRef } from '../../../../api/firebase'

export default function uploadFile ({ state }, file) {
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
        postedIn: moment().format('YYYY-MM-DD')
      })
        .then(function () {
          return db.collection('users').doc(state.authUserId).collection('files').doc(fileDoc.id)
            .set({ permissionlevel: 'owner' })
        })
        .then(function () {
          return db.collection('files').doc(fileDoc.id).collection('followers').doc(state.authUserId)
            .set({ permissionlevel: 'owner' })
        })
        .catch((error) => console.error(error))
    })
  })
}

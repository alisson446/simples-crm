import { db } from '../../../../api/firebase'

export default function checkFieldValueExists ({ state }, payload) {
  const { field, value } = payload
  state.userAccountInvalided = false

  return new Promise((resolve, reject) => {
    // Check if userAccount value contains invalid characters
    if (field === 'userAccount' && value.includes('@')) {
      state.userAccountInvalided = true
      resolve()
    }

    // Check if field value exists in users collection
    db.collection('users').where(field, '==', value).get()
      .then(function (docs) {
        state[`${field}Exists`] = false

        docs.forEach(function (doc) {
          state[`${field}Exists`] = doc.exists
        })

        resolve()
      })
      .catch(function (error) {
        console.error('Error getting documents: ', error)
        state[`${field}Exists`] = false
        reject(error)
      })
  })
}

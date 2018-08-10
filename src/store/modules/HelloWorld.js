import { SUM } from '../mutations'
import { db } from '../../../api/firebase'

export default {
  state: {
    count: 0
  },
  mutations: {
    [SUM] (state, payload) {
      state.count += parseInt(payload)
    }
  },
  actions: {
    addFirebase ({ commit }, payload) {
      db.collection('users').add({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
          commit(SUM, payload)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}

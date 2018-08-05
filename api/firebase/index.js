import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDXHBqwZr84ldSrvo',
  authDomain: 'simples-crm.firebaseapp.com',
  projectId: 'simples-crm'
})

export default firebase.firestore()

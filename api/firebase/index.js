import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDXHBqwZr84ldSrvo-9Nzn0cje4SfSk2uA',
  authDomain: 'simples-crm.firebaseapp.com',
  projectId: 'simples-crm'
})

export const db = firebase.firestore()
export const auth = firebase.auth()

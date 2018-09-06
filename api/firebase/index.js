import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyDXHBqwZr84ldSrvo-9Nzn0cje4SfSk2uA',
  authDomain: 'simples-crm.firebaseapp.com',
  projectId: 'simples-crm',
  storageBucket: 'simples-crm.appspot.com'
})

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storageRef = firebase.storage().ref()

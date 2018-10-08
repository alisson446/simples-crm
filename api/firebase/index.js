import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyDXHBqwZr84ldSrvo-9Nzn0cje4SfSk2uA',
  authDomain: 'simples-crm.firebaseapp.com',
  projectId: 'simples-crm',
  storageBucket: 'simples-crm.appspot.com'
}

const primaryApp = firebase.initializeApp(config)
export const secondaryApp = firebase.initializeApp(config, 'Secondary')

export const db = primaryApp.firestore()
export const auth = primaryApp.auth()
export const storageRef = primaryApp.storage().ref()

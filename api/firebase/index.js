import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE.AUTH_DOMAIN,
  projectId: process.env.FIREBASE.PROJECT_ID,
  storageBucket: process.env.FIREBASE.STORAGE_BUCKET
})

export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()
export const storageRef = firebaseApp.storage().ref()

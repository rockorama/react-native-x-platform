import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyC_bZy8mWVsgty2wCFzpuE8YD02e_rlxG8',
  authDomain: 'xp-messaging.firebaseapp.com',
  databaseURL: 'https://xp-messaging.firebaseio.com',
  projectId: 'xp-messaging',
  storageBucket: '',
  messagingSenderId: '303755169445',
  appId: '1:303755169445:web:ca561c43fffdbc5d66874c',
}

firebase.initializeApp(FIREBASE_CONFIG)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()

export const getNewCredential = password =>
  firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, password)

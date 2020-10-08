import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    // your Firebase credentials go here
    apiKey: "AIzaSyB63vik-6Y2l646l5tbTybc_0pX_SQe7ZU",
  authDomain: "mern-messenger-518a7.firebaseapp.com",
  databaseURL: "https://mern-messenger-518a7.firebaseio.com",
  projectId: "mern-messenger-518a7",
  storageBucket: "mern-messenger-518a7.appspot.com",
  messagingSenderId: "810799043716",
  appId: "1:810799043716:web:33a7ee985c5db71b761ed1"
})

const db = firebaseApp.firestore()

export default db
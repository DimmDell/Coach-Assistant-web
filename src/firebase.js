import * as firebase from 'firebase'


let config = {
  apiKey: "######",
  authDomain: "######",
  databaseURL: "######",
  storageBucket: "######",
  messagingSenderId: "######",
 
};

let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()

export default db
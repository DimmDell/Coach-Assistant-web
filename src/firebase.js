import * as firebase from 'firebase'


let config = {
  apiKey: "AIzaSyD2TAqyqeIGRkf2oIJaoJHbr6RIJxuygS8",
  authDomain: "coach-assistant-f0870.firebaseapp.com",
  databaseURL: "https://coach-assistant-f0870.firebaseio.com",
  projectId: "coach-assistant-f0870",
  storageBucket: "coach-assistant-f0870.appspot.com",
  messagingSenderId: "976774034442",
  appId: "1:976774034442:web:7f1a2c9539a43a2bb39bf3",
  measurementId: "G-7EDHSWDG11"
};

let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()

export default db
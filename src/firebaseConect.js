import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBlAsCUYDm_YqoLsc-lUyKxq5wcHTS7-0g",
    authDomain: "diaspora-89d5b.firebaseapp.com",
    projectId: "diaspora-89d5b",
    storageBucket: "diaspora-89d5b.appspot.com",
    messagingSenderId: "812193079971",
    appId: "1:812193079971:web:b6ff03546300be42059516"
  };

  if(!firebase.apps.length){
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
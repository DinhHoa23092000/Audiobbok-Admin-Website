import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDiLOGflJEFLk-4uZI6sht96lJn8GsvqWg",
    authDomain: "audiobook-9f43d.firebaseapp.com",
    projectId: "audiobook-9f43d",
    storageBucket: "audiobook-9f43d.appspot.com",
    messagingSenderId: "591257653176",
    appId: "1:591257653176:web:dae3eb24d33f326fbb494d",
    measurementId: "G-S65HP4WV61"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
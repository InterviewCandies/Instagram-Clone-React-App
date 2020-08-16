import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDEbSdHsm15FGOZk_DIqruEeQfhO1Z699o",
  authDomain: "instagram-clone-3aad9.firebaseapp.com",
  databaseURL: "https://instagram-clone-3aad9.firebaseio.com",
  projectId: "instagram-clone-3aad9",
  storageBucket: "instagram-clone-3aad9.appspot.com",
  messagingSenderId: "465115795251",
  appId: "1:465115795251:web:f0a23153ebe9c2d0cc7846",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };

import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWyekhl0qHnJyzLmc1_A-wxcNMj_QEljQ",
    authDomain: "instakart-2fc83.firebaseapp.com",
    projectId: "instakart-2fc83",
    storageBucket: "instakart-2fc83.appspot.com",
    messagingSenderId: "812007271186",
    appId: "1:812007271186:web:3ed0a09dbda7cd6ea321cb"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcOekv2WO9dpAonUevEm9MKanJzzOo7_Q",
  authDomain: "journal-app-63e81.firebaseapp.com",
  projectId: "journal-app-63e81",
  storageBucket: "journal-app-63e81.appspot.com",
  messagingSenderId: "990989151257",
  appId: "1:990989151257:web:64a9f834b3c4dd9ea90e88"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
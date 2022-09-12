// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAePD9fFZjdPRzbaH0fKaEtdM4Zb_jMQuY",
  authDomain: "dnd-project-d1498.firebaseapp.com",
  projectId: "dnd-project-d1498",
  storageBucket: "dnd-project-d1498.appspot.com",
  messagingSenderId: "749516303286",
  appId: "1:749516303286:web:deeb95e503354eeab0af17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
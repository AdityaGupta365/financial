// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAgX_l_GbayxrgnuuJNkiYxtegXt2qxMbc",
  authDomain: "financly-77.firebaseapp.com",
  projectId: "financly-77",
  storageBucket: "financly-77.appspot.com",
  messagingSenderId: "97785842876",
  appId: "1:97785842876:web:af8bfd5da035e9983fd4b9",
  measurementId: "G-827B3RD0JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

console.log('Firebase Initialized'); // Add this line

export { db, auth, provider,doc,setDoc };
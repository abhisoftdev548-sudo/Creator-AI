// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "creatorai-97c5b.firebaseapp.com",
  projectId: "creatorai-97c5b",
  storageBucket: "creatorai-97c5b.firebasestorage.app",
  messagingSenderId: "521883853955",
  appId: "1:521883853955:web:9bcd09c4f0ccbef97b27b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}
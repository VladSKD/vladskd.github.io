
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEeHoNr9X1PWK5iTp-fjPhvZY64mRm9C0",
  authDomain: "historylearnwebnulp.firebaseapp.com",
  projectId: "historylearnwebnulp",
  storageBucket: "historylearnwebnulp.firebasestorage.app",
  messagingSenderId: "766342392982",
  appId: "1:766342392982:web:045be018bd03160eaa26b7",
  measurementId: "G-4WZPGHB9E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Саме ці два рядки "експортують" auth та db, щоб інші файли їх бачили!
export const auth = getAuth(app);
export const db = getFirestore(app);
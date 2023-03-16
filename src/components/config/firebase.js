import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgposraOeh7lpw4DKy1ytbUdB8OPQHC5s",
  authDomain: "ekonobar-a4f2b.firebaseapp.com",
  projectId: "ekonobar-a4f2b",
  storageBucket: "ekonobar-a4f2b.appspot.com",
  messagingSenderId: "341879531699",
  appId: "1:341879531699:web:8789f76ffa1bf140eee8c6",
  measurementId: "G-C5BJ2BT9M2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv5CzzvRMHQooSyaVFLkaMrOgxPUr6RCE",
  authDomain: "students-data-5c081.firebaseapp.com",
  projectId: "students-data-5c081",
  storageBucket: "students-data-5c081.firebasestorage.app",
  messagingSenderId: "228763894486",
  appId: "1:228763894486:web:d24aad55dea0e531f13f77",
  measurementId: "G-EQ2RDW6ZJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
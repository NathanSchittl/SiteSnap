// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your Firebase project configuration (from Firebase console)
// You can find these under Project Settings → General → Your apps.
const firebaseConfig = {
  apiKey: "AIzaSyClDU6x5KzOcYQC09OjwNQFkMhNiBYuKjc",
  authDomain: "sitesnap-28da9.firebaseapp.com",
  projectId: "sitesnap-28da9",
  storageBucket: "sitesnap-28da9.firebasestorage.app",
  messagingSenderId: "230487344341",
  appId: "1:230487344341:web:607b67f8e6263d86ba0e5c",
  measurementId: "G-MXH9N9N99Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // Firebase Authentication service
export const db = getFirestore(app);   // Firestore database
export const storage = getStorage(app); // Firebase Storage (for photo uploads)

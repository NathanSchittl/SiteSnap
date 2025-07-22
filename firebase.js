// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your Firebase project configuration (from Firebase console)
// You can find these under Project Settings → General → Your apps.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  // ... other config values ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // Firebase Authentication service
export const db = getFirestore(app);   // Firestore database
export const storage = getStorage(app); // Firebase Storage (for photo uploads)

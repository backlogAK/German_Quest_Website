import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "german-quest-website.firebaseapp.com",
  projectId: "german-quest-website",
  storageBucket: "german-quest-website.firebasestorage.app",
  messagingSenderId: "861862337217",
  appId: "1:861862337217:web:e79f0c65076041cf689240",
  measurementId: "G-75M7JTLF6W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
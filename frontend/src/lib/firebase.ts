// ----------------- Play to Heal Database -----------------
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYSAdj82M3dxjEKbuDg-lymYXtBRx4ktE",
  authDomain: "play-to-heal-platform.firebaseapp.com",
  projectId: "play-to-heal-platform",
  storageBucket: "play-to-heal-platform.firebasestorage.app",
  messagingSenderId: "722052012505",
  appId: "1:722052012505:web:27247af5834583536261c8",
  measurementId: "G-7HL0YWB9G4",
};

// Prevent double initialization (Next.js hot reload safety)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional Google sign-in helper
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  return auth.currentUser;
};

/*
----------------- Testing Database ----------------------
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/
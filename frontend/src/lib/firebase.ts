// src/lib/firebase.ts
// Create a .env.local file for your Firebase configuration

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Shared Firebase Configuration (Week 5 - Team Database)
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCYSAdj82M3dxjEKbuDg-lymYXtBRx4ktE",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "play-to-heal-platform.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    "play-to-heal-platform",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "play-to-heal-platform.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    "722052012505",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:722052012505:web:27247af5834583536261c8",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
    "G-7HL0YWB9G4",
};

// Prevent double initialization (Next.js hot reload safety)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
//export const storage = getStorage(app);

// Optional Google sign-in helper
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  return auth.currentUser;
};

// Minimal, SSR-safe Analytics init (lazy + supported-only)
export async function initAnalytics() {
  if (typeof window === "undefined") return null; // guard SSR
  const { isSupported, getAnalytics } = await import("firebase/analytics");
  return (await isSupported()) ? getAnalytics(app) : null;
}

// Default export for compatibility
export default app;

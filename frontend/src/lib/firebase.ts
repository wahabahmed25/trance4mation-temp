import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIovxclPI4pTeIAq7GJcn1cJ2hHbNAcKs",
  authDomain: "test-5c0a6.firebaseapp.com",
  projectId: "test-5c0a6",
  storageBucket: "test-5c0a6.firebasestorage.app",
  messagingSenderId: "1089635971902",
  appId: "1:1089635971902:web:e9065e397b3d3369f3f26f",
  measurementId: "G-16106XDNQZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

//Minimal, SSR-safe Analytics init (lazy + supported-only)
export async function initAnalytics() {
  if (typeof window === "undefined") return null; // guard SSR
  const { isSupported, getAnalytics } = await import("firebase/analytics");
  return (await isSupported()) ? getAnalytics(app) : null;
}
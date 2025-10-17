import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { Poppins, Merriweather } from "next/font/google"

export const POPPINS_BOLD = Poppins({
    weight: "700"
})
export const MERRIWEATHER = Merriweather({
    weight: "400"
})

export const RED = "#ff8661"
export const TEAL = "#006D77"
export const YELLOW = "#FFD166"
export const BLUE = "#55CCF2"
export const PURPLE = "#985DE5"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE = getFirestore(app)
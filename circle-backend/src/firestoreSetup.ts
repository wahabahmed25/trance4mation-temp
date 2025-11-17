import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import 'dotenv/config'

// initialize the service account. Changes made through these firebase / firestore instances ignore security rules
const firebase = initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    }),
});
export const FIRESTORE = getFirestore(firebase)
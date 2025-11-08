// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBrGxcNTgaZ6QwA7xx2IbQzIQO0aKI6NXs",
   authDomain: "play-to-heal.firebaseapp.com",
   projectId: "play-to-heal",
   storageBucket: "play-to-heal.firebasestorage.app",
   messagingSenderId: "659291547170",
   appId: "1:659291547170:web:c127512e2df9b3125f0c7b",
   measurementId: "G-DLY37XH6F9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);
export { functions, analytics };

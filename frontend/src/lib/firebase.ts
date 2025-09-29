// frontend/src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmtz1JTloOq67d2zNJGBb96JCtuVabv2s",
  authDomain: "playtoheal-social.firebaseapp.com",
  projectId: "playtoheal-social",
  storageBucket: "playtoheal-social.firebasestorage.app",
  messagingSenderId: "789167709607",
  appId: "1:789167709607:web:9cfa47a0f9637ad424ea82"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
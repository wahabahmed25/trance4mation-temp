import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
export async function signup(name: string, email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: serverTimestamp(),
    });

    return { success: true, uid: user.uid };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error };
  }
}


export async function login (email: string, password: string){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Optionally fetch user profile from Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: true, uid: user.uid, data: userSnap.data() };
    } else {
      // fallback: user logged in but no Firestore doc
      return { success: true, uid: user.uid, data: null };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error };
  }
  
}

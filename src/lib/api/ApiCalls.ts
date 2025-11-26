import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  name: string;
  email: string;
  profilePic: string;
  [key: string]: unknown; // replace any with unknown
}

interface LoginResponse {
  success: boolean;
  user?: UserData;
  error?: string;
}

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
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const firestoreData = userSnap.exists() ? userSnap.data() : {};

    const userData: UserData = {
      uid: user.uid,
      name: (firestoreData.name as string) || user.displayName || "Anonymous User",
      email: user.email || "unknown@example.com",
      profilePic: (firestoreData.profilePic as string) || user.photoURL || "/default-avatar.png",
      ...firestoreData,
    };

    return { success: true, user: userData };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return { success: false, error: (error as Error).message || "Failed to log in. Please try again." };
  }
}

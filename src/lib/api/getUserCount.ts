import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";

export async function getUserCount(): Promise<number> {
  try {
    const collRef = collection(db, "users");
    const snapshot = await getCountFromServer(collRef); // efficient count
    return snapshot.data().count;
  } catch (error) {
    console.error("Failed to get user count:", error);
    return 0;
  }
}

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MoodEntry } from "../types";

/**
 * Load all mood entries for a user from Firestore.
 * Returns {} if no document exists.
 */
export async function loadUserMoods(uid: string): Promise<Record<string, MoodEntry>> {
  try {
    const ref = doc(db, "user_moods", uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      return (data.moods as Record<string, MoodEntry>) || {};
    }
    return {};
  } catch (err) {
    console.error("❌ Error loading user moods:", err);
    return {};
  }
}

/**
 * Save all mood entries for a user to Firestore.
 * Uses merge:true so existing data isn’t wiped.
 */
export async function saveUserMoods(uid: string, moods: Record<string, MoodEntry>) {
  try {
    const ref = doc(db, "user_moods", uid);
    await setDoc(
      ref,
      {
        moods,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error("❌ Error saving user moods:", err);
  }
}
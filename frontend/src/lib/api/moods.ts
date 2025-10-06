"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import type { MoodType, NullableMood } from "@/features/mood-calendar/types";

/**
 * Save a mood entry for a given user+date
 * If mood === null → delete the entry
 */
export async function saveMood(
  userId: string,
  dateKey: string,
  mood: NullableMood
) {
  const ref = doc(collection(db, "moods", userId, "entries"), dateKey);

  if (mood === null) {
    // ✅ remove the mood if cleared
    await deleteDoc(ref);
    return;
  }

  // ✅ otherwise set/merge the mood
  await setDoc(
    ref,
    {
      userId,
      date: dateKey,
      mood,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * Load all moods for a given user.
 * Optionally filter by prefix (e.g. "2025-09" for September 2025).
 */
export async function loadMoods(
  userId: string,
  prefix?: string
): Promise<Record<string, NullableMood>> {
  const moods: Record<string, NullableMood> = {};

  const entriesRef = collection(db, "moods", userId, "entries");
  const snap = await getDocs(entriesRef);

  snap.forEach((docSnap) => {
    const data = docSnap.data() as { mood: MoodType; date: string };
    if (!prefix || data.date.startsWith(prefix)) {
      moods[data.date] = data.mood;
    }
  });

  return moods;
}

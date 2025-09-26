"use client";

import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { MoodType } from "@/features/mood-calendar/types";

/**
 * Save a mood entry for a given user+date
 */
export async function saveMood(
  userId: string,
  dateKey: string,
  mood: MoodType
) {
  // Document path: moods/{userId}/entries/{dateKey}
  const ref = doc(collection(db, "moods", userId, "entries"), dateKey);

  await setDoc(
    ref,
    {
      userId,
      date: dateKey,
      mood,
      updatedAt: new Date().toISOString(),
    },
    { merge: true } // don’t overwrite existing fields
  );
}

/**
 * Load all moods for a given user.
 * Optionally filter by prefix (e.g. "2025-09" for September 2025).
 */
export async function loadMoods(
  userId: string,
  prefix?: string
): Promise<Record<string, MoodType>> {
  const moods: Record<string, MoodType> = {};

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
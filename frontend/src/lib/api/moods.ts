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
import type { MoodEntry } from "@/features/mood-calendar/types";

/**
 * ✅ Save or update a mood entry for a given user and date
 */
export async function saveMoodEntry(
  userId: string,
  dateKey: string,
  entry: MoodEntry | null
) {
  const ref = doc(collection(db, "moods", userId, "entries"), dateKey);

  if (entry === null || entry.mood === null) {
    await deleteDoc(ref); // clear if mood removed
    return;
  }

  await setDoc(
    ref,
    {
      userId,
      date: dateKey,
      mood: entry.mood,
      note: entry.note || "",
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

/**
 * ✅ Load all moods for a given user (optionally filtered by month)
 * Firestore path: moods/{userId}/entries/{YYYY-MM-DD}
 */
export async function loadMoodEntries(
  userId: string,
  prefix?: string
): Promise<Record<string, MoodEntry>> {
  const results: Record<string, MoodEntry> = {};

  const entriesRef = collection(db, "moods", userId, "entries");
  const snap = await getDocs(entriesRef);

  snap.forEach((docSnap) => {
    const data = docSnap.data() as MoodEntry & { date: string };
    if (!prefix || data.date.startsWith(prefix)) {
      results[data.date] = { mood: data.mood, note: data.note || "" };
    }
  });

  return results;
}

/**
 * ✅ Load one mood entry by date
 */
export async function loadSingleMoodEntry(
  userId: string,
  dateKey: string
): Promise<MoodEntry | null> {
  const ref = doc(db, "moods", userId, "entries", dateKey);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as MoodEntry;
}

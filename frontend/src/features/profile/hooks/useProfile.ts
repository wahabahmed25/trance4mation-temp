// frontend/src/features/profile/hooks/useProfile.ts
'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';
import { UserProfile, ProfileFormData } from '../types';
import { onAuthStateChanged } from 'firebase/auth';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /** -------------------------
   * Fetch User Profile
   * ------------------------- */
  const fetchProfile = async (userId: string) => {
    try {
      setLoading(true);
      const profileRef = doc(db, 'profiles', userId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data();

        setProfile({
          uid: userId,
          displayName: data.displayName || 'Anonymous Student',
          email: data.email || '',
          photoURL: data.photoURL,
          profilePhoto: data.profilePhoto || data.photoURL,
          age: data.age,
          gender: data.gender,
          biography: data.biography,
          healingFocus: data.healingFocus || [],
          intentionStatement: data.intentionStatement,
          personalIntention: data.personalIntention || data.intentionStatement,
          joinedDate: data.joinedDate?.toDate() || new Date(),
          stats: data.stats || {
            postsShared: 0,
            supportSent: 0,
            supportReceived: 0,
            connectionsMade: 0,
            daysActive: 0,
          },
          badges: data.badges || [],
        });
      } else {
        const defaultProfile: Partial<UserProfile> = {
          uid: userId,
          displayName: auth.currentUser?.displayName || 'Anonymous Student',
          email: auth.currentUser?.email || '',
          photoURL: auth.currentUser?.photoURL ?? null,
          profilePhoto: auth.currentUser?.photoURL || '',
          healingFocus: [],
          intentionStatement: '',
          personalIntention: '',
          joinedDate: new Date(),
          stats: {
            postsShared: 0,
            supportSent: 0,
            supportReceived: 0,
            connectionsMade: 0,
            daysActive: 1,
          },
          badges: [],
        };

        await setDoc(profileRef, defaultProfile);
        setProfile(defaultProfile as UserProfile);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  /** -------------------------
   * Update User Profile
   * ------------------------- */
  const updateUserProfile = async (formData: Partial<ProfileFormData>) => {
    if (!auth.currentUser) {
      setError('You must be logged in to update profile');
      throw new Error('User not authenticated');
    }

    try {
      const userId = auth.currentUser.uid;
      const profileRef = doc(db, 'profiles', userId);

      // Construct a Partial<UserProfile> update object + local updatedAt
      const updates: Partial<UserProfile> & { updatedAt?: Date } = {};

      if (formData.displayName !== undefined) {
        updates.displayName = formData.displayName;
      }

      if (formData.age !== undefined) {
        updates.age = formData.age;
      }

      if (formData.gender !== undefined) {
        // formData.gender is a string, cast it to the narrower union type
        updates.gender = formData.gender as UserProfile['gender'];
      }

      if (formData.biography !== undefined) {
        updates.biography = formData.biography;
      }

      if (formData.healingFocus !== undefined) {
        updates.healingFocus = formData.healingFocus;
      }

      if (formData.intentionStatement !== undefined) {
        updates.intentionStatement = formData.intentionStatement;
      }

      if (formData.personalIntention !== undefined) {
        updates.personalIntention = formData.personalIntention;
        // keep both fields in sync
        updates.intentionStatement = formData.personalIntention;
      }

      if (formData.profilePhoto !== undefined) {
        updates.profilePhoto = formData.profilePhoto;
        updates.photoURL = formData.profilePhoto;
      }

      updates.updatedAt = new Date();

      console.log('Updating profile with:', updates);

      await updateDoc(profileRef, updates);

      // Update Firebase Auth displayName if changed
      if (
        formData.displayName &&
        formData.displayName !== auth.currentUser.displayName
      ) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
        });
      }

      await fetchProfile(userId);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    }
  };

  /** -------------------------
   * Auth Listener
   * ------------------------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user.uid);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    profile,
    loading,
    error,
    updateUserProfile,
    refetchProfile: () => auth.currentUser && fetchProfile(auth.currentUser.uid),
  };
};

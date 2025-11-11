// frontend/src/features/profile/hooks/useProfile.ts
'use client'

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';
import { UserProfile, ProfileFormData, UserStats, RecentActivity } from '../types';
import { onAuthStateChanged } from 'firebase/auth';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore
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
          age: data.age,
          gender: data.gender,
          biography: data.biography,
          joinedDate: data.joinedDate?.toDate() || new Date(),
          stats: data.stats || {
            postsShared: 0,
            supportSent: 0,
            supportReceived: 0,
            connectionsMade: 0,
            daysActive: 0
          },
          badges: data.badges || []
        });
      } else {
        // Create default profile if doesn't exist
        const defaultProfile: Partial<UserProfile> = {
          uid: userId,
          displayName: auth.currentUser?.displayName || 'Anonymous Student',
          email: auth.currentUser?.email || '',
          photoURL: auth.currentUser?.photoURL || undefined,
          joinedDate: new Date(),
          stats: {
            postsShared: 0,
            supportSent: 0,
            supportReceived: 0,
            connectionsMade: 0,
            daysActive: 1
          },
          badges: []
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

  // Update user profile
  const updateUserProfile = async (formData: ProfileFormData) => {
    if (!auth.currentUser) {
      setError('You must be logged in to update profile');
      throw new Error('User not authenticated');
    }

    try {
      const userId = auth.currentUser.uid;
      const profileRef = doc(db, 'profiles', userId);

      // Update Firestore
      await updateDoc(profileRef, {
        displayName: formData.displayName,
        age: formData.age,
        gender: formData.gender,
        biography: formData.biography
      });

      // Update Firebase Auth display name if changed
      if (formData.displayName !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
      }

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          displayName: formData.displayName,
          age: formData.age,
          gender: formData.gender as any,
          biography: formData.biography
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    }
  };

  // Listen to auth state
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
    refetchProfile: () => auth.currentUser && fetchProfile(auth.currentUser.uid)
  };
};
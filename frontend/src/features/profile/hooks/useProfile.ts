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
          profilePhoto: data.profilePhoto || data.photoURL, // Support both fields
          age: data.age,
          gender: data.gender,
          biography: data.biography,
          healingFocus: data.healingFocus || [],
          intentionStatement: data.intentionStatement,
          personalIntention: data.personalIntention || data.intentionStatement, // Support both fields
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
  const updateUserProfile = async (formData: ProfileFormData | any) => {
    if (!auth.currentUser) {
      setError('You must be logged in to update profile');
      throw new Error('User not authenticated');
    }

    try {
      const userId = auth.currentUser.uid;
      const profileRef = doc(db, 'profiles', userId);

      // Filter out undefined values to avoid Firestore errors
      const updates: any = {};
      
      // Handle all possible fields
      if (formData.displayName !== undefined) updates.displayName = formData.displayName;
      if (formData.age !== undefined) updates.age = formData.age;
      if (formData.gender !== undefined) updates.gender = formData.gender;
      if (formData.biography !== undefined) updates.biography = formData.biography;
      if (formData.healingFocus !== undefined) updates.healingFocus = formData.healingFocus;
      if (formData.intentionStatement !== undefined) updates.intentionStatement = formData.intentionStatement;
      if (formData.personalIntention !== undefined) {
        updates.personalIntention = formData.personalIntention;
        updates.intentionStatement = formData.personalIntention; // Keep both in sync
      }
      if (formData.profilePhoto !== undefined) {
        updates.profilePhoto = formData.profilePhoto;
        updates.photoURL = formData.profilePhoto; // Keep both in sync
      }

      // Add timestamp
      updates.updatedAt = new Date();

      console.log('Updating profile with:', updates);

      // Update Firestore
      await updateDoc(profileRef, updates);

      // Update Firebase Auth display name if changed
      if (formData.displayName && formData.displayName !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
      }

<<<<<<< HEAD
      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          displayName: formData.displayName,
          age: formData.age,
          gender: formData.gender as UserProfile["gender"],
          biography: formData.biography,
          healingFocus: formData.healingFocus,
          intentionStatement: formData.intentionStatement
        });
      }
=======
      // Refresh profile to get latest data
      await fetchProfile(userId);

>>>>>>> origin/profile-page-new
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
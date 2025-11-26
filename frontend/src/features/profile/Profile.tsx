// frontend/src/features/profile/Profile.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BackgroundElements from '../../components/ui/BackgroundElements';
import ProfileHeader from './components/ProfileHeader';
import ProfileStats from './components/ProfileStats';
import EditProfileModal from './components/EditProfileModal';
import RecentActivity from './components/RecentActivity';
import MoodOverview from './components/MoodOverview';
// import MyCircles from './components/MyCircles';
import { useProfile } from './hooks/useProfile';

const AFFIRMATIONS = [
  "You are not alone.",
  "Healing begins when we listen and share.",
  "Every story shared is a bridge.",
  "Your journey matters.",
  "Growth happens in community.",
  "You bring light to this space."
];

const Profile = () => {
  const { profile, loading, error, updateUserProfile } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  // Rotate affirmations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F5E6F1] to-[#FFF0ED] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] rounded-full animate-pulse"></div>
          <div className="text-gray-600 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F5E6F1] to-[#FFF0ED] flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-red-200">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error || 'Failed to load profile'}</p>
            <p className="text-sm text-gray-500">
              Please make sure you&aposre logged in and try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4F8] via-[#F5E6F1] to-[#FFF0ED] relative overflow-hidden pb-24">
      <BackgroundElements />

      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] bg-clip-text text-transparent">
                  Profile
                </h1>
                <p className="text-gray-600">Your healing journey</p>
              </div>
            </div>
            <Link
              href="/home"
              className="group relative px-8 py-4 bg-white/80 backdrop-blur-md text-gray-700 font-semibold rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50"
            >
              <span className="relative z-10">← Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/10 to-[#5AB4C5]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Profile Header with Welcome */}
            <ProfileHeader 
              profile={profile} 
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Stats */}
            <ProfileStats stats={profile.stats} />

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <MyCircles /> */}
              <MoodOverview />
            </div>

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Affirmation Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-r from-[#4A90A4]/95 to-[#5AB4C5]/95 backdrop-blur-md border-t border-white/20 shadow-2xl">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <p className="text-white text-center text-lg font-medium transition-opacity duration-500">
              ✨ {AFFIRMATIONS[currentAffirmation]} ✨
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={updateUserProfile}
      />
    </div>
  );
};

export default Profile;
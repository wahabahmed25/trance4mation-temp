// frontend/src/features/profile/components/ProfileHeader.tsx
'use client'

import React from 'react';
import { UserProfile } from '../types';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatJoinDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/20 to-[#F4A89F]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              {profile.photoURL ? (
                <img 
                  src={profile.photoURL} 
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#4A90A4] to-[#5AB4C5] flex items-center justify-center text-white text-4xl font-bold">
                  {getInitials(profile.displayName)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-[#F4A89F] to-[#E88B7F] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">✨</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                {profile.displayName}
              </h1>
              <button
                onClick={onEditClick}
                className="px-6 py-2 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Edit Profile
              </button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              {profile.age && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-[#5AB4C5]/10 rounded-full">
                  <span className="text-[#4A90A4]">🎂</span>
                  <span className="text-gray-700 font-medium">{profile.age} years old</span>
                </div>
              )}
              {profile.gender && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-[#B8A6D9]/10 rounded-full">
                  <span className="text-[#7B6BA0]">👤</span>
                  <span className="text-gray-700 font-medium capitalize">{profile.gender.replace('-', ' ')}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#F4A89F]/10 rounded-full">
                <span className="text-[#E88B7F]">📅</span>
                <span className="text-gray-700 font-medium">Joined {formatJoinDate(profile.joinedDate)}</span>
              </div>
            </div>

            {/* Biography */}
            {profile.biography ? (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  {profile.biography}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-400 italic">
                  No biography added yet. Click "Edit Profile" to add one!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
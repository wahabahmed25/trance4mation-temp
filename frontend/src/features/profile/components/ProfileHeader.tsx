// frontend/src/features/profile/components/ProfileHeader.tsx
'use client'

import React from 'react';
import Image from 'next/image';

interface Profile {
  displayName: string;
  email: string;
  profilePhoto?: string;
  healingFocus?: string[];
  personalIntention?: string;
}

interface ProfileHeaderProps {
  profile: Profile;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
      {/* Welcome Message */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] bg-clip-text text-transparent mb-2">
          Welcome back, {profile.displayName}
        </h2>
        <p className="text-gray-600 text-lg">
          Your presence here matters. Every conversation you start brings more light to the world. ✨
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Photo Section */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8F4F8] to-[#F5E6F1] border-4 border-white shadow-xl relative">
            {profile.profilePhoto ? (
              <Image
                src={profile.profilePhoto}
                alt={profile.displayName}
                fill
                className="object-cover"
                sizes="160px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {profile.displayName}
              </h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <button
              onClick={onEditClick}
              className="px-6 py-2 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Edit Profile
            </button>
          </div>

          {/* Healing Focus */}
          {profile.healingFocus && profile.healingFocus.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                <span className="mr-2">🌿</span>
                Healing Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.healingFocus.map((focus, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-[#E8F4F8] to-[#F5E6F1] text-gray-700 rounded-full text-sm font-medium border border-[#4A90A4]/20"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Personal Intention */}
          {profile.personalIntention && (
            <div className="bg-gradient-to-r from-[#E8F4F8] to-[#F5E6F1] rounded-2xl p-6 border border-[#4A90A4]/20">
              <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                <span className="mr-2">💫</span>
                Personal Intention
              </h4>
              <p className="text-gray-700 italic leading-relaxed">
                "{profile.personalIntention}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
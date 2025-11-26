// frontend/src/features/profile/components/ProfileHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { UserProfile } from "../types";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEditClick,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5AB4C5]/20 to-[#F4A89F]/20 blur-xl rounded-3xl"></div>
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-start space-x-4">
            {/* Logo Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden">
                {/* Replace icon */}
                <div className="w-full h-full bg-gradient-to-br from-[#5AB4C5] via-[#B8A6D9] to-[#F4A89F] flex items-center justify-center animate-pulse">
                  <span className="text-3xl">🕊️</span>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] bg-clip-text text-transparent">
                  {profile.displayName}
                </span>
              </h2>
              <p className="text-gray-600 text-lg italic">
                Your presence here matters.
              </p>
              <p className="text-gray-600 mt-1">
                Every conversation you start brings more light to the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/20 to-[#F4A89F]/20 blur-xl rounded-3xl"></div>
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                {profile.photoURL ? (
                  <Image
                    src={profile.photoURL}
                    alt={profile.displayName}
                    width={200}
                    height={200}
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
            <div className="flex-1 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
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

              {/* Healing Focus Tags */}
              {profile.healingFocus && profile.healingFocus.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Healing Focus:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {profile.healingFocus.map((focus, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-[#B8A6D9]/20 to-[#5AB4C5]/20 text-[#4A90A4] rounded-full text-sm font-medium border border-[#5AB4C5]/30"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Intention Statement */}
              {profile.intentionStatement ? (
                <div className="bg-gradient-to-r from-[#F4A89F]/10 to-[#B8A6D9]/10 rounded-xl p-4 border border-[#F4A89F]/20">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    💫 My Intention:
                  </p>
                  <p className="text-gray-700 italic leading-relaxed">
                    &quot;{profile.intentionStatement}&quot;
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-400 italic text-sm">
                    Add your healing intention in Edit Profile to share what
                    brings you here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

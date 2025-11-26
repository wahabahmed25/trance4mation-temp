// frontend/src/features/profile/components/ProfileStats.tsx
'use client'

import React from 'react';
// Define UserStats type here if '../types' does not exist
export interface UserStats {
  postsShared: number;
  supportSent: number;
  supportReceived: number;
  connectionsMade: number;
  daysActive: number;
}

interface ProfileStatsProps {
  stats: UserStats;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Posts Shared',
      value: stats.postsShared,
      icon: '📝',
      color: 'from-[#4A90A4] to-[#5AB4C5]',
      bgColor: 'bg-[#5AB4C5]/10'
    },
    {
      label: 'Support Sent',
      value: stats.supportSent,
      icon: '💖',
      color: 'from-[#F4A89F] to-[#E88B7F]',
      bgColor: 'bg-[#F4A89F]/10'
    },
    {
      label: 'Support Received',
      value: stats.supportReceived,
      icon: '✨',
      color: 'from-[#B8A6D9] to-[#9B8BBE]',
      bgColor: 'bg-[#B8A6D9]/10'
    },
    {
      label: 'Connections Made',
      value: stats.connectionsMade,
      icon: '🤝',
      color: 'from-[#5AB4C5] to-[#4A90A4]',
      bgColor: 'bg-[#5AB4C5]/10'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#B8A6D9]/20 to-[#5AB4C5]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Statistics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity`}></div>
              <div className="relative p-4 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Days Active */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#F4A89F]/10 to-[#B8A6D9]/10 rounded-xl border border-[#F4A89F]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-sm text-gray-600">Active Days</p>
                <p className="text-xl font-bold text-gray-800">{stats.daysActive} days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Keep it up!</p>
              <p className="text-xs text-[#4A90A4] font-semibold">You're doing great 🌟</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
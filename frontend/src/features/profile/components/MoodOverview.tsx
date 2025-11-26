// frontend/src/features/profile/components/MoodOverview.tsx
'use client'

import React from 'react';
import Link from 'next/link';

const MoodOverview: React.FC = () => {
  // Mock data - in real app, this would come from Firebase
  const moodData = {
    currentStreak: 7,
    totalEntries: 45,
    mostCommonMood: '😊',
    weeklyAverage: 'Positive'
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#5AB4C5]/20 to-[#B8A6D9]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#5AB4C5] to-[#4A90A4] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">📅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Mood Tracker</h2>
          </div>
          <Link
            href="/mood-calendar"
            className="text-sm text-[#4A90A4] font-semibold hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-[#5AB4C5]/10 to-[#4A90A4]/10 rounded-xl">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-800">{moodData.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>

          <div className="p-4 bg-gradient-to-br from-[#F4A89F]/10 to-[#E88B7F]/10 rounded-xl">
            <div className="text-3xl mb-2">{moodData.mostCommonMood}</div>
            <div className="text-2xl font-bold text-gray-800">{moodData.weeklyAverage}</div>
            <div className="text-sm text-gray-600">Weekly Average</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Total Entries</span>
            <span className="text-2xl font-bold text-[#4A90A4]">{moodData.totalEntries}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodOverview;
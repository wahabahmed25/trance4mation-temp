// frontend/src/features/profile/components/MyCircles.tsx
'use client'

import React from 'react';
import Link from 'next/link';

const MyCircles: React.FC = () => {
  // Mock data - will be replaced with real circles from Firebase
  const circles = [
    {
      id: 1,
      name: 'Grief & Loss Support',
      members: 8,
      color: 'from-[#B8A6D9] to-[#9B8BBE]'
    },
    {
      id: 2,
      name: 'Youth Empowerment',
      members: 12,
      color: 'from-[#5AB4C5] to-[#4A90A4]'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#B8A6D9]/20 to-[#5AB4C5]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#B8A6D9] to-[#5AB4C5] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">🤝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">My Circles</h2>
          </div>
        </div>

        {/* Circles List */}
        {circles.length > 0 ? (
          <div className="space-y-3 mb-4">
            {circles.map((circle) => (
              <div
                key={circle.id}
                className="p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${circle.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                      ⭕
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{circle.name}</h3>
                      <p className="text-sm text-gray-600">{circle.members} members</p>
                    </div>
                  </div>
                  <Link
                    href="/discussion-circle"
                    className="px-4 py-2 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-4">
            <p className="text-gray-400 text-sm mb-4">You haven&apost joined any circles yet</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/discussion-circle"
            className="px-6 py-3 bg-gradient-to-r from-[#5AB4C5] to-[#4A90A4] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-center"
          >
            Join New Circle
          </Link>
          <Link
            href="/discussion-circle"
            className="px-6 py-3 bg-gradient-to-r from-[#F4A89F] to-[#E88B7F] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-center"
          >
            Create Circle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCircles;
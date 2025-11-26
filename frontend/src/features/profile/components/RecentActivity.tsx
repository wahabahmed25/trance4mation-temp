// frontend/src/features/profile/components/RecentActivity.tsx
'use client'

import React from 'react';

const RecentActivity: React.FC = () => {
  // Mock data - in real app, this would come from Firebase
  const activities = [
    {
      id: 1,
      type: 'post',
      description: 'Shared a post in Social Feed',
      timestamp: '2 hours ago',
      icon: '📝',
      color: 'from-[#4A90A4] to-[#5AB4C5]'
    },
    {
      id: 2,
      type: 'support',
      description: 'Sent support to 3 posts',
      timestamp: '5 hours ago',
      icon: '💖',
      color: 'from-[#F4A89F] to-[#E88B7F]'
    },
    {
      id: 3,
      type: 'mood',
      description: 'Logged your daily mood',
      timestamp: '1 day ago',
      icon: '😊',
      color: 'from-[#B8A6D9] to-[#9B8BBE]'
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4A89F]/20 to-[#B8A6D9]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-[#F4A89F] to-[#E88B7F] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">🕐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
// frontend/src/features/social-feed/components/CommunityGuidelines.tsx
import React from 'react';

const CommunityGuidelines: React.FC = () => {
  const guidelines = [
    "Share authentic experiences and feelings",
    "Celebrate small wins and progress",
    "Offer support and encouragement",
    "Respect others' journeys and experiences"
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4A89F]/20 to-[#E88B7F]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#F4A89F]/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#F4A89F] to-[#E88B7F] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">📋</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Community Guidelines</h3>
        </div>
        <div className="space-y-3">
          {guidelines.map((guideline, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 rounded-xl hover:bg-[#F4A89F]/10 transition-colors duration-200">
              <span className="text-[#F4A89F] font-bold mt-1">✓</span>
              <span className="text-gray-700 text-sm leading-relaxed">{guideline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
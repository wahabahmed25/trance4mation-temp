// frontend/src/features/social-feed/components/ActivityStats.tsx
import React from 'react';
import { ActivityStats as ActivityStatsType } from '../types';

interface ActivityStatsProps {
  stats?: ActivityStatsType;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ 
  stats = { postsShared: 12, supportSent: 47, connectionsMade: 23 }
}) => {
  const statItems = [
    { 
      label: "Posts shared", 
      value: stats.postsShared, 
      color: "purple", 
      icon: "📝" 
    },
    { 
      label: "Support sent", 
      value: stats.supportSent, 
      color: "pink", 
      icon: "💖" 
    },
    { 
      label: "Connections made", 
      value: stats.connectionsMade, 
      color: "blue", 
      icon: "🤝" 
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-[#9B5DE5]/20 text-[#9B5DE5]';
      case 'pink':
        return 'bg-[#FF8661]/20 text-[#FF8661]';
      case 'blue':
        return 'bg-[#55CCF2]/20 text-[#006D77]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF8661]/20 to-[#FFD166]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#FF8661]/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-[#FF8661] to-[#FFD166] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">📊</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Your Activity</h3>
        </div>
        <div className="space-y-4">
          {statItems.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{stat.icon}</span>
                <span className="text-gray-700 font-medium">{stat.label}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${getColorClasses(stat.color)}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStats;
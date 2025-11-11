// frontend/src/features/social-feed/components/Sidebar.tsx
import React from 'react';
import CommunityGuidelines from './CommunityGuidelines';
import SupportivePhrases from './SupportivePhrases';
import ActivityStats from './ActivityStats';
import { ActivityStats as ActivityStatsType } from '../types';

interface SidebarProps {
  userStats?: ActivityStatsType;
}

const Sidebar: React.FC<SidebarProps> = ({ userStats }) => {
  return (
    <div className="space-y-6">
      <CommunityGuidelines />
      <SupportivePhrases />
      <ActivityStats stats={userStats} />
    </div>
  );
};

export default Sidebar;
// frontend/src/features/profile/types/index.ts

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
  age?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | 'other';
  biography?: string;
  healingFocus?: string[]; // NEW: Tags like "Grief & Loss", "Resilience", etc.
  intentionStatement?: string; // NEW: Personal intention
  joinedDate: Date;
  stats: UserStats;
  badges?: Badge[];
}

export interface UserStats {
  postsShared: number;
  supportSent: number;
  supportReceived: number;
  connectionsMade: number;
  daysActive: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

export interface RecentActivity {
  id: string;
  type: 'post' | 'support' | 'mood' | 'discussion';
  description: string;
  timestamp: Date;
}

export interface ProfileFormData {
  displayName: string;
  age?: number;
  gender?: string;
  biography?: string;
  healingFocus?: string[]; // NEW
  intentionStatement?: string; // NEW
}

export const HEALING_FOCUS_OPTIONS = [
  'Grief & Loss',
  'Resilience',
  'Family Healing',
  'Inclusion',
  'Trauma Recovery',
  'Addiction & Recovery',
  'Youth Empowerment',
  'Mental Wellness',
  'Community Building',
  'Self-Discovery'
];
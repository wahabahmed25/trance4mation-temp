// frontend/src/features/profile/types/index.ts

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  age?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | 'other';
  biography?: string;
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
}
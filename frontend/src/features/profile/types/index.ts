// frontend/src/features/profile/types.ts
// Add these fields to your existing types

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string | null;
  profilePhoto?: string; // NEW: For calming images or uploaded photos
  age?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | 'other';
  biography?: string;
  healingFocus: string[];
  intentionStatement?: string;
  personalIntention?: string; // NEW: Alternative name for intentionStatement
  joinedDate: Date;
  stats: UserStats;
  badges: string[];
}

export interface ProfileFormData {
  displayName: string;
  age?: number;
  gender?: string;
  biography?: string;
  healingFocus?: string[];
  intentionStatement?: string;
  personalIntention?: string; // NEW
  profilePhoto?: string; // NEW
}

export interface UserStats {
  postsShared: number;
  supportSent: number;
  supportReceived: number;
  connectionsMade: number;
  daysActive: number;
}

export interface RecentActivity {
  id: string;
  type: 'post' | 'support' | 'connection';
  title: string;
  date: Date;
  icon: string;
}
// frontend/src/features/social-feed/types/index.ts

export interface Post {
  id: string;
  author: string;
  content: string;
  prompt?: string; // The prompt question the user is answering
  timestamp: string;
  supportCount: number;
  relateCount: number;
  supportedBy?: string[]; // Array of user IDs who clicked Support
  relatedBy?: string[]; // Array of user IDs who clicked I Relate
  type: 'win' | 'encouragement' | 'checkin' | 'general';
  createdAt: Date;
  userId?: string; // Firebase Auth user ID
}

export interface PostCreationData {
  content: string;
  prompt?: string;
  type: Post['type'];
}

export type SupportAction = 'support' | 'relate';

export interface ActivityStats {
  postsShared: number;
  supportSent: number;
  connectionsMade: number;
}
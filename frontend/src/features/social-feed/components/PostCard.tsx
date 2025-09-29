// frontend/src/features/social-feed/components/PostCard.tsx
'use client'

import React from 'react';
import GradientButton from '../../../components/ui/GradientButton';
import { Post, SupportAction } from '../types';

interface PostCardProps {
  post: Post;
  onSupportAction: (postId: string, action: SupportAction) => void;
  index?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSupportAction, index = 0 }) => {
  const getPostTypeGradient = (type: string) => {
    switch (type) {
      case 'win': return 'from-emerald-400 to-teal-400';
      case 'encouragement': return 'from-purple-400 to-indigo-400';
      case 'checkin': return 'from-blue-400 to-cyan-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPostTypeBorder = (type: string) => {
    switch (type) {
      case 'win': return 'border-emerald-200';
      case 'encouragement': return 'border-purple-200';
      case 'checkin': return 'border-blue-200';
      default: return 'border-gray-200';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'win': return { emoji: '🎉', label: 'Win', color: 'bg-emerald-100 text-emerald-700' };
      case 'encouragement': return { emoji: '💪', label: 'Support', color: 'bg-purple-100 text-purple-700' };
      case 'checkin': return { emoji: '✅', label: 'Check-in', color: 'bg-blue-100 text-blue-700' };
      default: return { emoji: '💬', label: 'General', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeInfo = getPostTypeLabel(post.type);

  return (
    <div 
      className="group relative transform hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${getPostTypeGradient(post.type)} opacity-20 blur-xl rounded-3xl`}></div>
      <div className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border ${getPostTypeBorder(post.type)} hover:shadow-2xl transition-all duration-300`}>
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-14 h-14 bg-gradient-to-r ${getPostTypeGradient(post.type)} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {post.author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-bold text-gray-800 text-lg">{post.author}</h3>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${typeInfo.color}`}>
                {typeInfo.emoji} {typeInfo.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{post.timestamp}</p>
          </div>
        </div>
        
        <p className="text-gray-800 mb-8 leading-relaxed text-lg font-medium">{post.content}</p>
        
        {/* Support Actions */}
        <div className="flex space-x-4">
          <GradientButton
            onClick={() => onSupportAction(post.id, 'support')}
            variant="support"
            size="md"
            className="flex items-center space-x-3"
          >
            <span className="text-xl group-hover:animate-pulse">💖</span>
            <span className="font-bold">Send Support</span>
            <span className="px-2 py-1 bg-white/80 rounded-full text-sm font-bold">{post.supportCount}</span>
          </GradientButton>
          
          <GradientButton
            onClick={() => onSupportAction(post.id, 'relate')}
            variant="relate"
            size="md"
            className="flex items-center space-x-3"
          >
            <span className="text-xl group-hover:animate-pulse">✨</span>
            <span className="font-bold">I Relate</span>
            <span className="px-2 py-1 bg-white/80 rounded-full text-sm font-bold">{post.relateCount}</span>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
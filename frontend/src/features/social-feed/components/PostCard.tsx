// frontend/src/features/social-feed/components/PostCard.tsx
'use client'

import React, { useState } from 'react';
import GradientButton from '../../../components/ui/GradientButton';
import { Post, SupportAction } from '../types';

interface PostCardProps {
  post: Post;
  onSupportAction: (postId: string, action: SupportAction) => void;
  onEdit: (postId: string, newContent: string) => void;
  onDelete: (postId: string) => void;
  index?: number;
  isOwner?: boolean; // Whether current user owns this post
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onSupportAction, 
  onEdit,
  onDelete,
  index = 0,
  isOwner = true // For now, default to true since we don't have auth
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getPostTypeGradient = (type: string) => {
    switch (type) {
      case 'win': return 'from-[#FFD166] to-[#FF8661]';
      case 'encouragement': return 'from-[#9B5DE5] to-[#55CCF2]';
      case 'checkin': return 'from-[#55CCF2] to-[#006D77]';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getPostTypeBorder = (type: string) => {
    switch (type) {
      case 'win': return 'border-[#FFD166]/30';
      case 'encouragement': return 'border-[#9B5DE5]/30';
      case 'checkin': return 'border-[#55CCF2]/30';
      default: return 'border-gray-200';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'win': return { emoji: '🎉', label: 'Win', color: 'bg-[#FFD166]/20 text-[#FF8661]' };
      case 'encouragement': return { emoji: '💪', label: 'Support', color: 'bg-[#9B5DE5]/20 text-[#9B5DE5]' };
      case 'checkin': return { emoji: '✅', label: 'Check-in', color: 'bg-[#55CCF2]/20 text-[#006D77]' };
      default: return { emoji: '💬', label: 'General', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeInfo = getPostTypeLabel(post.type);

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== post.content) {
      onEdit(post.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(post.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div 
      className="group relative transform hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${getPostTypeGradient(post.type)} opacity-20 blur-xl rounded-3xl`}></div>
      <div className={`relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 ${getPostTypeBorder(post.type)} hover:shadow-2xl transition-all duration-300`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4 flex-1">
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

          {/* Edit/Delete Buttons for Post Owner */}
          {isOwner && !isEditing && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-[#006D77] hover:bg-[#006D77]/10 rounded-lg transition-colors"
                title="Edit post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-[#FF8661] hover:bg-[#FF8661]/10 rounded-lg transition-colors"
                title="Delete post"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Prompt Display - Shows what question the user is answering */}
        {post.prompt && (
          <div className="mb-4 pb-4 border-b-2 border-[#FFD166]/30">
            <div className="flex items-start space-x-2">
              <span className="text-[#FFD166] text-lg">💭</span>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Answering Prompt</p>
                <p className="text-sm font-semibold text-[#006D77]">
                  {post.prompt}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Post Content or Edit Mode */}
        {isEditing ? (
          <div className="mb-6">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-4 border-2 border-[#55CCF2] rounded-xl resize-none focus:outline-none bg-white text-gray-800"
              rows={4}
              maxLength={280}
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">{280 - editContent.length} characters</span>
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-gradient-to-r from-[#006D77] to-[#55CCF2] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 mb-8 leading-relaxed text-lg font-medium">{post.content}</p>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mb-6 p-4 bg-[#FF8661]/10 border border-[#FF8661]/30 rounded-xl">
            <p className="text-gray-800 font-medium mb-3">Are you sure you want to delete this post?</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#FF8661] text-white rounded-lg hover:bg-[#FF8661]/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        
        {/* Support Actions */}
        {!isEditing && !showDeleteConfirm && (
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
        )}
      </div>
    </div>
  );
};

export default PostCard;
// frontend/src/features/social-feed/components/PostCreationForm.tsx
'use client'

import React, { useState } from 'react';
import GradientButton from '../../../components/ui/GradientButton';
import { PostCreationData } from '../types';

interface PostCreationFormProps {
  onSubmit: (postData: PostCreationData) => Promise<void>;
  loading?: boolean;
}

const PostCreationForm: React.FC<PostCreationFormProps> = ({ onSubmit, loading = false }) => {
  const [newPost, setNewPost] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const prompts = [
    "How are you feeling today?",
    "Share a small win from this week",
    "What's one thing you're grateful for?",
    "Send some encouragement to fellow students",
    "What's helping you get through tough times?"
  ];

  const handleSubmit = async () => {
    if (newPost.trim()) {
      try {
        await onSubmit({
          content: newPost,
          type: 'general' // Could be enhanced to detect type based on content/prompt
        });
        setNewPost('');
        setSelectedPrompt('');
      } catch (error) {
        console.error('Error submitting post:', error);
      }
    }
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setNewPost(prompt + ' ');
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">💭</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Share with the community</h2>
            <p className="text-gray-600">Your voice matters. Let's support each other.</p>
          </div>
        </div>
        
        {/* Prompt Selection */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-4">Choose a prompt or write freely:</p>
          <div className="flex flex-wrap gap-3">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="group relative px-5 py-3 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-2xl hover:from-purple-200 hover:to-pink-200 transition-all duration-300 border border-purple-200/50 shadow-sm hover:shadow-md"
              >
                <span className="relative z-10">{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Post Input */}
        <div className="relative mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What would you like to share today? ✨"
            className="w-full p-6 border-2 border-gray-200/50 rounded-2xl resize-none focus:border-purple-400 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner"
            rows={5}
            maxLength={280}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-300 peer-focus:opacity-100"></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              {280 - newPost.length} characters remaining
            </span>
            <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                style={{ width: `${Math.min((newPost.length / 280) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <GradientButton
            onClick={handleSubmit}
            disabled={!newPost.trim() || loading}
            variant="primary"
            size="md"
          >
            {loading ? 'Sharing...' : 'Share ✨'}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default PostCreationForm;
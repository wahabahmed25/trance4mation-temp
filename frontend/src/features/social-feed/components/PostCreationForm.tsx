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

  // Extended list of prompts
  const allPrompts = [
    "How are you feeling today?",
    "Share a small win from this week",
    "Whats one thing you're grateful for?",
    "Send some encouragement to fellow students",
    "What's helping you get through tough times?",
    "What made you smile today?",
    "Share something positive that happened recently",
    "What's a challenge you're facing and how are you handling it?",
    "What's one thing you're looking forward to?",
    "Share a piece of advice that helped you",
    "What's something you're proud of accomplishing?",
    "How are you practicing self-care today?",
    "What's a goal you're working towards?",
    "Share a lesson you learned recently",
    "What's bringing you peace right now?"
  ];

  // Get daily rotating prompts (5 prompts per day)
  const getDailyPrompts = () => {
    const today = new Date();
    // Calculate day of year (1-365)
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Use day of year to determine starting index (rotates every day)
    const startIndex = (dayOfYear * 5) % allPrompts.length;
    
    const dailyPrompts: string[] = [];
    for (let i = 0; i < 5; i++) {
      dailyPrompts.push(allPrompts[(startIndex + i) % allPrompts.length]);
    }
    
    return dailyPrompts;
  };

  const prompts = getDailyPrompts();

  const handleSubmit = async () => {
    if (newPost.trim()) {
      try {
        await onSubmit({
          content: newPost,
          prompt: selectedPrompt || undefined,
          type: 'general'
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
    setNewPost('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#006D77]/20 to-[#55CCF2]/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#006D77] to-[#55CCF2] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">💭</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Share with the community</h2>
            <p className="text-gray-600">Your voice matters. Let's support each other.</p>
          </div>
        </div>
        
        {/* Prompt Selection */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-4">Choose today's prompt or write freely:</p>
          <div className="flex flex-wrap gap-3">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className={`group relative px-5 py-3 text-sm font-medium rounded-2xl transition-all duration-300 border shadow-sm hover:shadow-md ${
                  selectedPrompt === prompt
                    ? 'bg-gradient-to-r from-[#FFD166] to-[#FF8661] text-white border-[#FFD166]'
                    : 'bg-gradient-to-r from-[#9B5DE5]/10 to-[#55CCF2]/10 text-[#006D77] hover:from-[#9B5DE5]/20 hover:to-[#55CCF2]/20 border-[#55CCF2]/50'
                }`}
              >
                <span className="relative z-10">{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Prompt Display */}
        {selectedPrompt && (
          <div className="mb-4 p-4 bg-gradient-to-r from-[#FFD166]/10 to-[#FF8661]/10 rounded-xl border border-[#FFD166]/30">
            <p className="text-sm text-gray-600 font-medium">Answering prompt:</p>
            <p className="text-[#006D77] font-semibold">{selectedPrompt}</p>
          </div>
        )}

        {/* Post Input */}
        <div className="relative mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={selectedPrompt ? "Share your thoughts..." : "What would you like to share today? ✨"}
            className="w-full p-6 border-2 border-gray-200/50 rounded-2xl resize-none focus:border-[#55CCF2] focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 shadow-inner"
            rows={5}
            maxLength={280}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              {280 - newPost.length} characters remaining
            </span>
            <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#006D77] to-[#55CCF2] transition-all duration-300 rounded-full"
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

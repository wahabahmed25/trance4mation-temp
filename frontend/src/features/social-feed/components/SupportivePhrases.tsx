// frontend/src/features/social-feed/components/SupportivePhrases.tsx
import React from 'react';

const SupportivePhrases: React.FC = () => {
  const supportivePhrases = [
    "You've got this! 💪",
    "Sending positive vibes your way! ✨",
    "I believe in you! 🌟",
    "You're stronger than you think! 🦋"
  ];

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    // Could add toast notification here
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl rounded-3xl"></div>
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-200/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">💬</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Quick Support</h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm">Click to copy supportive messages:</p>
        <div className="space-y-2">
          {supportivePhrases.map((phrase, index) => (
            <button
              key={index}
              onClick={() => handleCopyPhrase(phrase)}
              className="w-full text-left p-3 text-sm bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 rounded-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:shadow-md transform hover:-translate-y-0.5"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportivePhrases;
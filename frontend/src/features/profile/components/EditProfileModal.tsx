// frontend/src/features/profile/components/EditProfileModal.tsx
'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface Profile {
  displayName: string;
  email: string;
  profilePhoto?: string;
  healingFocus?: string[];
  personalIntention?: string;
}

interface EditProfileModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Partial<Profile>) => Promise<void>;
}

const CALMING_IMAGES = [
  { id: 'sunset', url: '/calming-images/sunset.jpg', name: 'Peaceful Sunset', emoji: '🌅' },
  { id: 'ocean', url: '/calming-images/ocean.jpg', name: 'Calm Ocean', emoji: '🌊' },
  { id: 'forest', url: '/calming-images/forest.jpg', name: 'Serene Forest', emoji: '🌲' },
  { id: 'mountain', url: '/calming-images/mountain.jpg', name: 'Mountain Vista', emoji: '⛰️' },
  { id: 'flowers', url: '/calming-images/flowers.jpg', name: 'Garden Flowers', emoji: '🌸' },
];

const HEALING_FOCUS_OPTIONS = [
  'Grief & Loss',
  'Resilience',
  'Family Healing',
  'Inclusion',
  'Trauma Recovery',
  'Addiction & Recovery',
  'Youth Empowerment',
  'Mental Wellness',
  'Chronic Illness',
  'Caregiver Support',
];

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [healingFocus, setHealingFocus] = useState<string[]>(profile.healingFocus || []);
  const [personalIntention, setPersonalIntention] = useState(profile.personalIntention || '');
  const [profilePhoto, setProfilePhoto] = useState(profile.profilePhoto);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleCalmingImageSelect = (imageUrl: string) => {
    setProfilePhoto(imageUrl);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(''); // Set to empty string instead of null/undefined
  };

  const toggleHealingFocus = (focus: string) => {
    setHealingFocus((prev) =>
      prev.includes(focus)
        ? prev.filter((f) => f !== focus)
        : [...prev, focus]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Only include defined values to avoid Firestore errors
      const updates: Partial<Profile> = {
        displayName,
        healingFocus,
        personalIntention,
      };
      
      // Only add profilePhoto if it's defined
      if (profilePhoto !== undefined) {
        updates.profilePhoto = profilePhoto;
      }
      
      await onSave(updates);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] bg-clip-text text-transparent">
              Edit Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Profile Photo Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Profile Photo
            </label>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Photo Preview */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8F4F8] to-[#F5E6F1] border-4 border-white shadow-lg relative">
                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">👤</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Calming Images Selection */}
              <div className="flex-1">
                <div className="bg-gradient-to-r from-[#E8F4F8] to-[#F5E6F1] rounded-2xl p-5 border border-[#4A90A4]/20">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="mr-2">🌅</span>
                    Choose Your Profile Photo
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Select one of our peaceful calming images
                  </p>
                  <div className="grid grid-cols-5 gap-3">
                    {CALMING_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        onClick={() => handleCalmingImageSelect(img.url)}
                        className={`relative group`}
                        title={img.name}
                      >
                        <div className={`aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
                          profilePhoto === img.url 
                            ? 'ring-4 ring-[#4A90A4] scale-105' 
                            : 'ring-2 ring-gray-200 hover:ring-[#4A90A4] hover:scale-105'
                        }`}>
                          <Image
                            src={img.url}
                            alt={img.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="text-center mt-1 text-xs text-gray-600">
                          {img.emoji}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Remove Photo Button */}
                  {profilePhoto && (
                    <button
                      onClick={handleRemovePhoto}
                      className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-all duration-300"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                {/* Info about future uploads */}
                <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-xs text-blue-700 flex items-start">
                    <span className="mr-2 text-sm">ℹ️</span>
                    <span>Custom photo uploads will be available soon! For now, choose from our calming nature images.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Healing Focus */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Healing Focus Areas
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Select the areas you're focusing on in your healing journey
            </p>
            <div className="flex flex-wrap gap-2">
              {HEALING_FOCUS_OPTIONS.map((focus) => (
                <button
                  key={focus}
                  onClick={() => toggleHealingFocus(focus)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    healingFocus.includes(focus)
                      ? 'bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Intention */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Personal Intention
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Share what brings you to this healing space
            </p>
            <textarea
              value={personalIntention}
              onChange={(e) => setPersonalIntention(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent outline-none resize-none"
              placeholder="I am here to heal through connection. My intention is to rediscover joy and build community."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
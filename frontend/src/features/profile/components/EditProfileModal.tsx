// frontend/src/features/profile/components/EditProfileModal.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { UserProfile, ProfileFormData, HEALING_FOCUS_OPTIONS } from '../types';

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: ProfileFormData) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: profile.displayName,
    age: profile.age,
    gender: profile.gender,
    biography: profile.biography,
    healingFocus: profile.healingFocus || [],
    intentionStatement: profile.intentionStatement || ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({
      displayName: profile.displayName,
      age: profile.age,
      gender: profile.gender,
      biography: profile.biography,
      healingFocus: profile.healingFocus || [],
      intentionStatement: profile.intentionStatement || ''
    });
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const toggleHealingFocus = (focus: string) => {
    const current = formData.healingFocus || [];
    if (current.includes(focus)) {
      setFormData({ ...formData, healingFocus: current.filter(f => f !== focus) });
    } else {
      setFormData({ ...formData, healingFocus: [...current, focus] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/20 to-[#F4A89F]/20 blur-xl rounded-3xl"></div>
        <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">✏️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <span className="text-gray-500 text-2xl">×</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5AB4C5] focus:outline-none transition-colors"
                placeholder="Your display name"
              />
            </div>

            {/* Healing Focus */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Healing Focus (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {HEALING_FOCUS_OPTIONS.map((focus) => (
                  <button
                    key={focus}
                    type="button"
                    onClick={() => toggleHealingFocus(focus)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.healingFocus?.includes(focus)
                        ? 'bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {focus}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Intention Statement */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Personal Intention Statement
              </label>
              <textarea
                value={formData.intentionStatement || ''}
                onChange={(e) => setFormData({ ...formData, intentionStatement: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5AB4C5] focus:outline-none transition-colors resize-none"
                rows={3}
                maxLength={200}
                placeholder="e.g., I am here to heal through connection. My intention is to rediscover joy and build community."
              />
              <p className="text-sm text-gray-500 mt-1">
                {(formData.intentionStatement || '').length}/200 characters
              </p>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                min="13"
                max="120"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : undefined })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5AB4C5] focus:outline-none transition-colors"
                placeholder="Your age"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender || ''}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5AB4C5] focus:outline-none transition-colors"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Biography */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Biography
              </label>
              <textarea
                value={formData.biography || ''}
                onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5AB4C5] focus:outline-none transition-colors resize-none"
                rows={4}
                maxLength={500}
                placeholder="Tell us about yourself..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {(formData.biography || '').length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;


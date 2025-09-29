// frontend/src/components/ui/GradientButton.tsx
import React from 'react';

interface GradientButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'support' | 'relate';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  disabled = false,
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white';
      case 'secondary':
        return 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white border border-white/50';
      case 'support':
        return 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-600 hover:from-pink-200 hover:to-red-200 border border-pink-200/50';
      case 'relate':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 hover:from-blue-200 hover:to-cyan-200 border border-blue-200/50';
      default:
        return 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3';
      case 'lg':
        return 'px-8 py-3 text-lg';
      default:
        return 'px-6 py-3';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative font-semibold rounded-2xl transition-all duration-300 
        shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GradientButton;
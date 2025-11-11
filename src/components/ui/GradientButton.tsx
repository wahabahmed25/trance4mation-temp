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
        return 'bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] hover:from-[#3A7A94] hover:to-[#4AA4B5] text-white';
      case 'secondary':
        return 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white border border-white/50';
      case 'support':
        return 'bg-gradient-to-r from-[#F4A89F]/20 to-[#F4A89F]/30 text-[#E88B7F] hover:from-[#F4A89F]/30 hover:to-[#F4A89F]/40 border border-[#F4A89F]/50';
      case 'relate':
        return 'bg-gradient-to-r from-[#5AB4C5]/20 to-[#5AB4C5]/30 text-[#4A90A4] hover:from-[#5AB4C5]/30 hover:to-[#5AB4C5]/40 border border-[#5AB4C5]/50';
      default:
        return 'bg-gradient-to-r from-[#4A90A4] to-[#5AB4C5] hover:from-[#3A7A94] hover:to-[#4AA4B5] text-white';
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
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
        return 'bg-gradient-to-r from-[#006D77] to-[#55CCF2] hover:from-[#005760] hover:to-[#3DB8E0] text-white';
      case 'secondary':
        return 'bg-white/80 backdrop-blur-md text-gray-600 hover:bg-white border border-white/50';
      case 'support':
        return 'bg-gradient-to-r from-[#FF8661]/20 to-[#FF8661]/30 text-[#FF8661] hover:from-[#FF8661]/30 hover:to-[#FF8661]/40 border border-[#FF8661]/50';
      case 'relate':
        return 'bg-gradient-to-r from-[#55CCF2]/20 to-[#55CCF2]/30 text-[#55CCF2] hover:from-[#55CCF2]/30 hover:to-[#55CCF2]/40 border border-[#55CCF2]/50';
      default:
        return 'bg-gradient-to-r from-[#006D77] to-[#55CCF2] hover:from-[#005760] hover:to-[#3DB8E0] text-white';
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
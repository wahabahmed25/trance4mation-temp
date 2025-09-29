// frontend/src/components/ui/BackgroundElements.tsx
import React from 'react';

const BackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  );
};

export default BackgroundElements;
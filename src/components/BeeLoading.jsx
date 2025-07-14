import React, { useEffect, useState } from 'react';

const BeeLoadingScreen = ({ isLoaded, onLoaded, progress }) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && progress >= 100) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        onLoaded();
      }, 500); // Short fade-out delay
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress, onLoaded]);

  if (!showLoading) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-amber-50 flex flex-col justify-center items-center z-[9999]"
      style={{ 
        opacity: showLoading ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      {/* Bee loading animation */}
      <div className="w-24 h-24 relative mb-5">
        <div className="absolute w-10 h-10 bg-yellow-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div 
          className="absolute w-14 h-8 border-2 border-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: 'flap 0.5s infinite alternate'
          }}
        />
      </div>
      
      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mb-2 overflow-hidden">
        <div 
          className="h-full bg-amber-500 transition-all duration-300 ease-linear" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      
      <p className="text-amber-900 font-sans text-sm">
        {progress < 100 ? 'Preparing your flight...' : 'Ready for takeoff!'}
      </p>

      <style>{`
        @keyframes flap {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(20deg); }
        }
      `}</style>
    </div>
  );
};

export default BeeLoadingScreen;
import React, { useEffect, useState } from 'react';
import loaderImg from '../assets/loader1.png';

const saffronTags = [
  'World’s Most Precious Spice',
  'Handpicked from the Valleys of Kashmir',
  'Golden Threads of Purity',
  'Aroma of Luxury',
  'Nature’s Red Gold',
  'Tradition in Every Strand',
  'Saffron: The Taste of Royalty',
];

const BeeLoadingScreen = ({ isLoaded, onLoaded, progress }) => {
  const [showLoading, setShowLoading] = useState(true);
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    if (isLoaded && progress >= 100) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        onLoaded();
      }, 500); // Short fade-out delay
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress, onLoaded]);

  useEffect(() => {
    if (showLoading) {
      const tagTimer = setInterval(() => {
        setTagIndex((prev) => (prev + 1) % saffronTags.length);
      }, 1800);
      return () => clearInterval(tagTimer);
    }
  }, [showLoading]);

  if (!showLoading) return null;

  return (
    <div 
      className="fixed inset-0 w-full h-full flex flex-col justify-center items-center z-[9999]"
      style={{ 
        background: '#ff6523',
        opacity: showLoading ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      {/* Loader image */}
      <div className="w-28 h-28 mb-6 flex items-center justify-center animate-pulse">
        <img src={loaderImg} alt="Saffron Loader" className="w-full h-full object-contain rounded-full shadow-lg" />
      </div>
      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-amber-500 transition-all duration-300 ease-linear" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      {/* Saffron tags */}
      <div className="mt-2 text-center">
        <p className="text-white font-serif text-lg font-semibold animate-fade-in-slow">
          {saffronTags[tagIndex]}
        </p>
        <p className="text-white font-sans text-sm mt-2">
          {progress < 100 ? 'Preparing your Saffron experience...' : 'Saffron is ready!'}
        </p>
      </div>
      <style>{`
        @keyframes fade-in-slow {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.8s linear;
        }
      `}</style>
    </div>
  );
};

export default BeeLoadingScreen;
import React from 'react';
import saffronHome from '../assets/saffronHome.png';

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Main content container */}
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          {/* Decorative left image - dimmed behind background (hidden on mobile) */}
          <img
            src={saffronHome}
            alt="Decorative Saffron"
            className="hidden md:block fixed top-1/2 -left-20 md:-left-40 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[375px] lg:h-[375px] object-cover pointer-events-none opacity-30 z-0"
            style={{
              transform: 'translateY(-50%)'
            }}
          />

          {/* Decorative right image - dimmed behind background (hidden on mobile) */}
          <img 
            src={saffronHome} 
            alt="Decorative Saffron"
            className="hidden md:block fixed top-1/2 right-0 md:-right-40 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[375px] lg:h-[375px] object-cover pointer-events-none opacity-30 z-0"
            style={{
              transform: 'translateY(-50%)'
            }}
          />

          {/* Main centered image */}
          <img 
            src={saffronHome} 
            alt="Saffron Home" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] object-cover z-0" 
          />

          {/* Centered text */}
          <h1 className="text-[#ffc1a7] text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[220px] 2xl:text-[280px] font-extrabold font-poppins text-center tracking-wider opacity-90 drop-shadow-2xl leading-none z-10 relative">
            Saffron
          </h1>
        </div>

        {/* Bottom right description - responsive positioning */}
        <div className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 md:bottom-15 md:right-15 lg:bottom-20 lg:right-20 text-black font-poppins text-left max-w-[150px] sm:max-w-[200px] md:max-w-[250px] leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg z-10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/80 rounded-full blur-[80px] z-0"></div>
          <p className="relative z-10">
            We partner directly with trusted saffron farmers in Kashmir. No middlemen, no compromise—just pure, traceable saffron.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
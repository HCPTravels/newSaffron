import React from 'react';
import saffronHome from '../assets/saffronHome.png';

const HeroSection = () => {
  return (
    <div className="pt-[200px] relative">
      <section className="h-[calc(100vh-80px)] relative overflow-visible">
        {/* Fixed decorative left image - dimmed behind background */}
        <img
          src={saffronHome}
          alt="Decorative Saffron"
          className="fixed top-[586px] left-[-154px] w-[375px] h-[375px] object-cover pointer-events-none"
          style={{
            opacity: 0.3,
            zIndex: 0
          }}
          
        />

        <div className="h-full flex items-center justify-center" style={{ marginTop: '-5rem' }}>
          {/* Text above the image */}
          <div className="relative z-10">
            <h1 className="text-[#ffc1a7] mb-[200px] text-[80px] sm:text-[120px] md:text-[180px] lg:text-[250px] xl:text-[330px] font-extrabold font-poppins text-center tracking-wider opacity-90 drop-shadow-2xl leading-none">
              Saffron
            </h1>
          </div>

          {/* Image behind the text */}
          <img 
            src={saffronHome} 
            alt="Saffron Home" 
            className="absolute top-1/2 -mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[767px] xl:h-[767px] object-cover z-0" 
          />
          
          <img 
            src={saffronHome} 
            alt="Saffron Home" 
            style={{
                opacity: 0.3,
                zIndex: 0
              }}
            className="absolute top-1/2 transform left-[969px] fixed -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[767px] xl:h-[767px] object-cover z-0" 
          />
        </div>
        

        {/* Bottom right description with blur glow */}
        <div className="absolute bottom-10 right-5 sm:bottom-15 sm:right-10 md:bottom-20 md:right-20 text-black font-poppins text-left max-w-[150px] sm:max-w-[200px] md:max-w-[250px] leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] z-10">
          <div className="absolute top-30 right-20 w-32 h-32 bg-white/80 rounded-full blur-[80px]"></div>
          <p>
            We partner directly with trusted saffron farmers in Kashmir. No middlemen, no compromise—just pure, traceable saffron.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
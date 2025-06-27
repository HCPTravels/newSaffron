import React from 'react';
import saffronHome from '../assets/saffronHome.png';
import BeeCanvas from '../modal/BeeCanvas';

const HeroSection = () => {
  return (
    <div className="pt-[100px] md:pt-[200px] relative">
      <BeeCanvas />
      <section className="h-[calc(100vh-80px)] relative overflow-hidden">
        {/* Left decorative image */}
        <img
          src={saffronHome}
          alt="Decorative Saffron"
          className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                 md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                 object-cover pointer-events-none opacity-30 z-0"
        />

        <div className="h-full flex items-center justify-center" style={{ marginTop: '-5rem' }}>
          {/* Text above the image */}
          <div className="relative z-10">
            <h1 className="text-[#ffc1a7] mb-[100px] md:mb-[200px]
                          text-[60px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[250px] 2xl:text-[330px]
                          font-extrabold font-poppins text-center tracking-wider opacity-90 drop-shadow-2xl leading-none">
              Saffron
            </h1>
          </div>

          {/* Image container */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="relative flex justify-center">
              {/* Center main image */}
              <img 
                src={saffronHome} 
                alt="Saffron Home" 
                className="relative
                          w-[200px] h-[200px] xs:w-[250px] xs:h-[250px]
                          sm:w-[300px] sm:h-[300px]
                          md:w-[400px] md:h-[400px]
                          lg:w-[500px] lg:h-[500px]
                         xl:w-[700px] xl:h-[700px]
                          2xl:w-[767px] 2xl:h-[767px]
                          object-cover z-0" 
              />
              
              {/* Right decorative image - same size as center but half off-screen */}
              <img 
                src={saffronHome} 
                alt="Saffron Home" 
                className="absolute left-full opacity-30
                          w-[200px] h-[200px] xs:w-[250px] xs:h-[250px]
                          sm:w-[300px] sm:h-[300px]
                          md:w-[400px] md:h-[400px]
                          lg:w-[500px] lg:h-[500px]
                          xl:w-[700px] xl:h-[700px]
                          2xl:w-[767px] 2xl:h-[767px]
                          object-cover z-0" 
                style={{
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Bottom right description */}
        <div className="absolute bottom-60 right-5 xs:bottom-10 xs:right-10
                        sm:bottom-15 sm:right-10 md:bottom-40 md:right-20
                        text-black font-poppins text-left
                        max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[250px]
                        leading-relaxed
                        text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                        z-10">
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
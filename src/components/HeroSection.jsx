import React from 'react';
import saffronHome from '../assets/saffronHome.png';
import BeeCanvas from '../modal/BeeCanvas';
import traceable from '../assets/traceable.png'

const HeroSection = () => {
  return (
    <div className="relative">
      <BeeCanvas />
      {/* Changed to min-h-screen and removed fixed height */}
      <section className="min-h-screen relative overflow-visible"> {/* Changed overflow to visible */}
        {/* Left decorative image - unchanged */}
        <img
          src={saffronHome}
          alt="Decorative Saffron"
          className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                 md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                 object-cover pointer-events-none opacity-30 z-0"
        />

        <div className="h-full flex items-center justify-center" style={{ marginTop: '8rem' }}>
          {/* Text above the image - unchanged */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
  <h1 className="text-[#ffc1a7] 
                text-[80px] sm:text-[80px] md:text-[120px] lg:text-[180px] xl:text-[250px] 2xl:text-[330px]
                font-extrabold font-poppins text-center tracking-wider opacity-90 drop-shadow-2xl leading-none">
    Saffron
  </h1>
</div>

          {/* Image container - key changes here */}
          <div className="absolute top-1/3 md:top-[300px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="relative flex justify-center">
              {/* Center main image - added max-h-screen to prevent cutting */}
              <img 
                src={saffronHome} 
                alt="Saffron Home" 
                className="relative max-h-[90vh]  /* Added max-height */
                  w-[500px] h-[500px] 
                  xs:w-[250px] xs:h-[250px]
                  sm:w-[300px] sm:h-[300px]
                  md:w-[300px] md:h-[300px]
                  lg:w-[500px] lg:h-[500px]
                  xl:w-[600px] xl:h-[600px] /* Slightly reduced */
                  2xl:w-[600px] 2xl:h-[600px]/* Slightly reduced */
                  object-contain z-0"  /* Changed to contain */
              />
              
              {/* Right decorative image - same adjustments */}
              <img 
                src={saffronHome} 
                alt="Saffron Home" 
                className="hidden md:block absolute left-full opacity-30 max-h-[90vh]
                  w-[200px] h-[200px] xs:w-[250px] xs:h-[250px]
                  sm:w-[300px] sm:h-[300px]
                  md:w-[400px] md:h-[400px]
                  lg:w-[500px] lg:h-[500px]
                  xl:w-[550px] xl:h-[550px]
                  2xl:w-[600px] 2xl:h-[600px]
                  object-contain z-0" 
                style={{
                  transform: 'translateX(-50%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Feature badges - UPDATED to look more informative */}
        <div className="absolute md:hidden bottom-40 left-1/2 transform -translate-x-1/2 z-0">
          <div className="flex flex-col gap-3 items-center px-4">
            {/* First row - two informative badges */}
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[140px] text-center">
                <span className="text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-90">✨ Grade A+ Quality</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[140px] text-center">
                <span className="text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-90">🌱 100% Natural</span>
              </div>
            </div>
            {/* Second row - two informative badges */}
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[140px] text-center">
                <span className="text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-90">🏔️ Kashmir Origin</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 shadow-lg min-w-[140px] text-center">
                <span className="text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-90">🔍 Traceable</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom right description - unchanged */}
        <div className="absolute mt-112 ml-50  xs:bottom-10 xs:right-10
                        sm:bottom-15 sm:right-10 md:bottom-40 md:right-20
                        text-black font-poppins text-left
                        max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[250px]
                        leading-relaxed
                        text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                        z-10">
          <div className="absolute top-30 right-20 w-32 h-32 bg-white/80 rounded-full blur-[80px]"></div>
          <div className="text-right max-w-xs">
  <div className="inline-block ">
    <p className="text-sm md:text-xl whitespace-nowrap font-light text-white/90 tracking-[0.2em] uppercase">Pure • Traceable</p>
    <p className="text-xl md:text-2xl whitespace-nowrap font-medium text-[#ffc1a7] tracking-tight mt-1 md:mt-2 leading-none">Kashmiri Saffron</p>
    <div className="mt-2 md:mt-3 h-[1px] w-full bg-gradient-to-l from-[#ffc1a7]/70 via-[#ffc1a7]/30 to-transparent"></div>
    <div>
    <img src={traceable} className='ml-10 hidden md:block md:ml-30 h-15 w-15 md:h-30 md:w-30 rotate-15'/>
    </div>
  </div>
</div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
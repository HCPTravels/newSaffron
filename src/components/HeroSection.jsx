import React from 'react';
import saffronHome from '../assets/saffronHome.png';
import BeeCanvas from '../modal/BeeCanvas';
import traceable from '../assets/traceable.png'
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate('/signup')
  }
  return (
    <div className="relative">
      <BeeCanvas />
      {/* Changed to min-h-screen and removed fixed height */}
      <section className="md:min-h-screen h-[70vh] relative overflow-visible"> {/* Changed overflow to visible */}
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

          {/* Modern Mobile Hero Text */}
          <div className="md:hidden absolute top-[1%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-6 text-center">
            <h2 className="mt-4 text-[28px] leading-tight font-bold text-[#ffc1a7] font-poppins tracking-tight drop-shadow-md">
              Nature's Most Precious Spice
            </h2>
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

            {/* Buy Now Button - Added this section */}
            {/* Buy Now Button - Position optimized */}
            <div className="absolute top-[calc(100%+30px)] left-[50%] transform -translate-x-1/2 z-30">
  <button
    onClick={clickHandler}
    className="relative bg-[#ffb89b] text-gray-900 font-medium py-3 px-10 rounded-lg
              transition-all duration-300 hover:bg-gray-50
              text-sm md:text-base tracking-wider
              shadow-sm hover:shadow-md
              border border-gray-200
              group/btn overflow-hidden"
  >
    {/* Smooth underline */}
    <span className="absolute bottom-0 left-1/2 h-[2px] bg-[#ff7e5f] 
                    w-0 group-hover/btn:w-full group-hover/btn:left-0
                    transition-all duration-300 ease-out" />
    
    <span className="relative z-10 flex items-center gap-2">
      <span>Buy Now</span>
      <svg 
        viewBox="0 0 16 16" 
        className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M6 12L10 8L6 4" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    </span>
  </button>
</div>
          </div>
        </div>

        {/* Bottom right description - unchanged */}
        <div className="absolute 
                bottom-30 right-10 xs:bottom-10 xs:right-10
                sm:bottom-16 sm:right-10 md:bottom-35 md:right-20
                text-black font-poppins text-left
                max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[250px]
                leading-relaxed
                text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl
                z-10">

          {/* Background blur effect */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/80 rounded-full blur-3xl"></div>

          <div className="text-right max-w-xs relative">
            <div className="inline-block">
              <div className="flex flex-col items-end">
                <p className="text-lg md:text-xl font-light text-white/90 tracking-[0.1em] uppercase">
                  Pure • Traceable
                </p>
                <p className="text-xl md:text-2xl font-medium text-[#ffc1a7] tracking-tight leading-none">
                  Kashmiri Saffron
                </p>
              </div>
              <div className="mt-2 md:mt-3 h-px w-full bg-gradient-to-l from-[#ffc1a7]/70 via-[#ffc1a7]/30 to-transparent"></div>

              {/* Image with proper responsive classes - hidden on mobile, shown on md and up */}
              <div className="mt-1 md:mt-3 flex justify-end">
                <img
                  src={traceable}
                  className="h-8 w-8 md:h-20 md:w-20 hidden md:block rotate-12"
                  alt="Traceable"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
import React from "react";

const Contact = () => {
  const buttons = ['Whatsapp', 'Call Now', 'Email'];
  
  return (
    <div className="flex justify-center items-center p-2 sm:p-4 min-h-screen sm:min-h-0">
      <div className="w-full max-w-[95%] sm:max-w-[1100px] z-19 h-auto min-h-[320px] sm:min-h-[300px] md:h-[488px] flex justify-center items-center bg-white/100 transparent rounded-[15px] sm:rounded-[30px] md:rounded-[50px] flex-col space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-10 backdrop-blur-md border border-white/30">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight px-2 text-gray-800">
            Got Questions?<br className="sm:hidden" /> Talk to a Real Person
          </h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-[20px] max-w-[95%] sm:max-w-[90%] md:max-w-[720px] mx-auto px-2 leading-relaxed text-gray-700">
            Whether you need saffron for home use, gifting, or bulk business orders, we're just a call or WhatsApp away.
          </p>
        </div>
        
        {/* Mobile-First Button Container */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 px-2 sm:px-0 sm:gap-4">
          {buttons.map((button, index) => {
            const isPrimary = index === 1;
            return (
              <button
                key={index}
                className={`
                  w-full max-w-[280px] sm:w-[160px] md:w-[180px] lg:w-[200px] 
                  h-[50px] sm:h-[45px] md:h-[55px] 
                  rounded-full border-2
                  text-base sm:text-base md:text-lg lg:text-[22px]
                  font-medium
                  flex items-center justify-center
                  transition-all duration-300 
                  active:scale-95
                  touch-manipulation
                  ${isPrimary 
                    ? 'bg-[#fe6522] text-white border-[#fe6522] hover:bg-[#e55a1f] hover:border-[#e55a1f] shadow-md hover:shadow-lg'
                    : 'text-[#fe6522] border-[#fe6522] bg-white hover:bg-[#fe6522] hover:text-white shadow-sm hover:shadow-md'}
                `}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;
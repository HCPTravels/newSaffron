import React from "react";

const Contact = () => {
  const buttons = ['Whatsapp', 'Call Now', 'Email'];
  
  return (
    <div className="flex justify-center items-center p-3 sm:p-4">
      <div className="w-full max-w-[1100px] h-auto min-h-[280px] sm:min-h-[300px] md:h-[488px] flex justify-center items-center bg-gray-100 rounded-[20px] sm:rounded-[30px] md:rounded-[50px] flex-col space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 md:p-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight px-2">
            Got Questions?<br className="sm:hidden" /> Talk to a Real Person
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-[20px] max-w-[95%] sm:max-w-[90%] md:max-w-[720px] mx-auto px-2 leading-relaxed">
            Whether you need saffron for home use, gifting, or bulk business orders, we're just a call or WhatsApp away.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-[400px] sm:max-w-none space-y-3 sm:space-y-0">
          {buttons.map((button, index) => {
            const isPrimary = index === 1;
            return (
              <button
                key={index}
                className={`
                  text-sm sm:text-base md:text-lg lg:text-[22px] 
                  px-6 py-3 sm:px-4 sm:py-2 md:px-6 md:py-3 
                  w-full sm:w-[160px] md:w-[180px] lg:w-[200px] 
                  h-[48px] sm:h-[45px] md:h-[55px] 
                  rounded-full 
                  mx-0 sm:mx-1 md:mx-2 
                  border-2 
                  transition-all duration-300 
                  font-medium
                  active:scale-95
                  touch-manipulation
                  ${isPrimary 
                    ? 'bg-[#fe6522] text-white border-[#fe6522] hover:bg-[#e55a1f] hover:border-[#e55a1f] shadow-md hover:shadow-lg'
                    : 'bg-white text-[#fe6522] border-[#fe6522] hover:bg-[#fe6522] hover:text-white shadow-sm hover:shadow-md'}
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
import React from "react";

const Contact = () => {
  const buttons = ['Whatsapp', 'Call Now', 'Email'];
  return (
    <div className="flex justify-center items-center">
      <div className="w-[1100px] h-[488px] flex justify-center items-center bg-gray-100 rounded-[50px] flex-col space-y-8 p-10">
        <div className="text-center space-y-2">
          <h2 className="text-[40px] poppins-bold">Got Questions? Talk to a Real Person</h2>
          <p className="text-[20px] max-w-[720px] p-2">Whether you need saffron for home use, gifting, or bulk business orders, we're just a call or WhatsApp away.</p>
        </div>
        <div>
          {buttons.map((button, index) => {
            const isPrimary = index === 1;
            return (
              <button
                key={index}
                className={`
                  text-[22px] px-6 py-3 w-[200px] h-[55px] rounded-full m-2 border transition-all duration-300
                  ${isPrimary 
                    ? 'bg-[#fe6522] text-white border-[#fe6522] hover:bg-[#e55a1f]'
                    : 'bg-white text-[#fe6522] border-[#fe6522] hover:bg-[#fe6522] hover:text-white'}
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

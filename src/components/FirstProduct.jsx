import React from 'react';
import { MoveRight, Link } from 'lucide-react';

const ProductFeatureSection = ({
  id = 1,
  title = "Default Title",
  description = "Default description",
  features = [],
  image
}) => {
  const isEven = id % 2 === 0;

  return (
    <section className="min-h-screen relative z-10 flex items-center overflow-x-hidden">
      <div
        className={`container grid grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start px-4 sm:px-6 ${
          isEven ? 'md:ml-[57px]' : ''
        }`}
      >
        {/* Left/Right Column - Text + Number */}
        <div
          className={`col-span-12 md:col-span-5 flex flex-col ${
            isEven
              ? 'items-end text-right md:order-2 md:translate-x-8 lg:translate-x-25'
              : 'items-start text-left md:order-1'
          }`}
        >
          <p className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[250px] text-[#ffc1a7] leading-none font-bold select-none -mt-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            {id.toString().padStart(2, '0')}
          </p>
          <img
            src={image}
            alt="Saffron"
            className="w-full max-w-[300px] sm:max-w-[400px] -mt-20 md:max-w-[500px] lg:max-w-[600px] h-auto object-contain"
          />
        </div>

        {/* Right/Left Column - Info */}
        <div
          className={`col-span-12 md:col-span-7 text-[#ffc1a7] space-y-6 ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h2>

          <div className="relative text-black font-poppins max-w-[250px] leading-relaxed text-[14px] sm:text-[16px] md:text-[18px]">
            <div className="absolute top-[50px] left-[50px] w-32 h-32 bg-white/80 rounded-full blur-[80px]" />
            <p className="break-words whitespace-pre-wrap">
              {description.replace(/&/g, '\n&')}
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex text-black items-center space-x-3"
              >
                {feature.icon === 'link' ? <Link size={20} /> : <MoveRight size={20} />}
                <p className="text-base sm:text-lg font-medium">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureSection;
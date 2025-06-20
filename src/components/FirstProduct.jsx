import React from 'react';
import { MoveRight, Link } from 'lucide-react';

const ProductFeatureSection = ({
  id = 1,
  title = "Default Title",
  description = "Default description",
  features = [],
  image,
  imageClass
}) => {
  const isEven = id % 2 === 0;

  return (
    <section className="py-12 relative z-10 flex items-center overflow-x-hidden">
      <div
        className={`container grid grid-cols-12 gap-2 md:gap-12 lg:gap-16 items-start px-4 sm:px-6 ${
          isEven ? 'md:ml-[57px]' : ''
        }`}
      >
        {/* Left/Right Column - Image hello */}
        
        <div
          className={`col-span-12 md:col-span-5 flex flex-col justify-center ${
            isEven
              ? 'items-end text-right md:order-2 md:translate-x-4 lg:translate-x-10'
              : 'items-start text-left md:order-1'
          }`}
        >
          {/* Spacer to preserve layout after removing the big ID number */}
          <div className="h-[160px] hidden md:block" />

          <img
            src={image}
            alt="Saffron"
            className={`w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain ${imageClass || ''}`}
          />
        </div>

        {/* Right/Left Column - Info */}
        <div
          className={`col-span-12 md:col-span-7 text-[#ffc1a7] space-y-4 ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            {title}
          </h2>

          <div className="relative text-black font-poppins max-w-[280px] leading-relaxed text-sm sm:text-base md:text-[16px]">
            <div className="absolute top-[40px] left-[40px] w-24 h-24 bg-white/70 rounded-full blur-[70px]" />
            <p className="break-words whitespace-pre-wrap">
              {description.replace(/&/g, '\n&')}
            </p>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex text-black items-center space-x-2"
              >
                {feature.icon === 'link' ? <Link size={18} /> : <MoveRight size={18} />}
                <p className="text-sm sm:text-base font-medium">
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

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
        className={`container flex flex-row md:flex-row gap-6 md:gap-12 lg:gap-16 items-start px-4 sm:px-6 ${
          isEven ? 'md:ml-[57px]' : ''
        }`}
      >
        {/* Text Section */}
        <div
          className={`w-full space-y-4 text-[#ffc1a7] ${
            isEven
              ? 'order-1 md:order-1 text-left md:text-left items-start'
              : 'order-2 md:order-1 text-left md:text-left items-start'
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

        {/* Image Section */}
        <div
          className={`w-full flex flex-col justify-center ${
            isEven
              ? 'order-2 md:order-2 items-center md:items-end text-center md:text-right'
              : 'order-1 md:order-2 items-center md:items-start text-center md:text-left'
          }`}
        >
          <div className="h-[100px] hidden md:h-[100px]" />
          <img
            src={image}
            alt="Saffron"
            className={`w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain ${imageClass || ''}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureSection;
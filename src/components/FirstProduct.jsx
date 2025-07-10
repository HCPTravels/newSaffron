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
        className={`container flex flex-row md:flex-row gap-6 md:gap-120 lg:gap-16 items-start px-4 sm:px-6 ${isEven ? 'md:ml-[57px]' : ''}`}
      >
        {/* Text Section */}
        <div
          className={`w-full space-y-4 text-[#ffc1a7] ${isEven
            ? 'order-1 md:order-1 text-left md:text-left items-start'
            : 'order-2 md:order-2 text-left md:text-left items-start'
            }`}
        >
          <h2 className="text-sm sm:text-3xl md:text-5xl font-bold leading-tight">
            {title}
          </h2>

          <div className="relative text-black font-poppins w-full leading-relaxed text-[8px] sm:text-base md:text-[20px]">
            <div className="absolute top-[40px] left-[40px] w-24 h-24 bg-white/70 rounded-full blur-[70px]" />
            <div className="whitespace-pre-wrap">
              {description.split('&').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-left mb-4 line-clamp-7 md:line-clamp-none last:mb-0"
                  style={{
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    lineHeight: '1.6',
                    letterSpacing: '0.01em'
                  }}
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          <div className="md:block">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group inline-flex items-center gap-3 md:gap-4 px-3 py-2 rounded-full hover:bg-[#fef3ec] transition-all duration-200 cursor-pointer"
                onClick={feature.onClick}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-6 h-6 md:w-9 md:h-9 bg-[#ffe1d2] group-hover:bg-[#ffc8a8] rounded-full transition-all">
                  {feature.icon === 'link' ? (
                    <Link className="text-[#E55A1D] w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <MoveRight className="text-[#E55A1D] w-4 h-4 md:w-5 md:h-5" />
                  )}
                </div>
              
                {/* Text */}
                <p className="text-sm md:text-base text-[#333] font-medium group-hover:text-[#E55A1D] transition-all">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div
          className={`w-full flex flex-col justify-center ${isEven
            ? 'order-2 md:order-2 items-center md:items-end text-center md:text-right'
            : 'order-1 md:order-1 items-center md:items-start text-center md:text-left'
            }`}
        >
          <div className="h-0 hidden md:h-[100px]" />
          <img
            src={image}
            alt="Saffron"
            className={`w-full max-w-[300px] ml-[-30px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain ${imageClass || ''}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureSection;
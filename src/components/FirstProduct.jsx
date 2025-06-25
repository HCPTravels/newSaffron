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
        className={`container flex flex-row md:flex-row gap-6 md:gap-12 lg:gap-16 items-start px-4 sm:px-6 ${isEven ? 'md:ml-[57px]' : ''
          }`}
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

          <div className="relative  text-black font-poppins max-w-[280px] leading-relaxed text-[8px] sm:text-base md:text-[20px]">
            <div className="absolute top-[40px] left-[40px] w-24 h-24 bg-white/70 rounded-full blur-[70px]" />
            <p className="break-words whitespace-pre-wrap">
              {description.replace(/&/g, '\n&')}
            </p>
          </div>

          <div className="md:block">
  {features.map((feature, index) => (
    <div
      key={index}
      className="flex items-start gap-1 md:gap-3 space-y-2"
    >
      <div className="flex-shrink-0 mt-0.5">
        {feature.icon === 'link' ? (
          <Link className="text-black w-2 h-2 md:w-4 md:h-4" />
        ) : (
          <MoveRight className="text-black w-2 h-2 md:w-4 md:h-4" />
        )}
      </div>
      <p className="md:text-[16px] text-[8px] text-black leading-snug break-words">
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
            className={`w-full max-w-[300px]  ml-[-30px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain ${imageClass || ''}`}
          />
          {/* <div className="md:hidden space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-1"
              >
                <div className="flex-shrink-0 mt-0.5 text-[8px]">
                  {feature.icon === 'link' ? (
                    <Link size={8} className="text-black" />
                  ) : (
                    <MoveRight size={8} className="text-black" />
                  )}
                </div>
                <p className="text-[8px] text-black leading-snug break-words">
                  {feature.text}
                </p>
              </div>
            ))}
          </div> */}

        </div>
      </div>

    </section>
  );
};

export default ProductFeatureSection;
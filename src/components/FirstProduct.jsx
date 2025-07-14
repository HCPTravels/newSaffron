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
  const isFirstImage = id === 1;
  const isFourthImage = id === 4;

  return (
    <section className="py-4 md:py-10 relative z-10 flex items-center overflow-x-hidden">
      <div className={`w-full mx-auto px-4 sm:px-6 ${isEven ? 'md:mr-[40px]' : 'md:ml-[40px]'}`}>
        {/* Mobile: Keep border and shadow, Desktop: Remove them */}
        <div className={`border-2 border-black rounded-[20px]  bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0)] md:border-0 md:shadow-none md:bg-transparent`}>
          <div
            className={`flex flex-row md:flex-row gap-3 md:gap-6 lg:gap-8 items-start p-2 sm:p-3 ${isEven ? 'md:ml-[0]' : ''}`}
          >
            {/* Text Section */}
            <div
              className={`w-full space-y-2 text-[#ffc1a7] bg-white rounded-lg md:bg-transparent ${
                isEven
                  ? 'order-1 md:order-1 text-left md:text-left items-start'
                  : 'order-2 md:order-2 text-left md:text-left items-start'
              }`}
            >
              <h2 className="text-sm sm:text-3xl md:text-5xl font-bold leading-tight">
                {title}
              </h2>

              <div className="relative text-black font-poppins w-full leading-relaxed text-[8px] sm:text-base md:text-[20px]">
                <div className="absolute w-24 h-24 bg-white/70 rounded-full blur-[70px]" />
                <div className="whitespace-pre-wrap">
                  {description.split('&').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="text-left mb-4 last:mb-0 line-clamp-5 md:line-clamp-none"
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
                    className="flex items-center gap-1 md:gap-3 space-y-2"
                  >
                    {/* Capsule Button */}
                    <button
                      className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-6 py-1.5 md:py-3 bg-[#ff6523] text-white rounded-full md:bg-white md:text-black transition-colors duration-200 cursor-pointer group"
                      onClick={feature.onClick}
                    >
                      {/* White Circle with Icon */}
                      <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 md:bg-[#ff6523] rounded-full flex items-center justify-center">
                        {feature.icon === 'link' ? (
                          <Link className="text-black w-2 h-2 md:w-3 md:h-3" />
                        ) : (
                          <MoveRight className="text-black w-2 h-2 md:w-3 md:h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                        )}
                      </div>

                      {/* Text */}
                      <span className="text-[8px] md:text-sm font-medium whitespace-nowrap">
                        {feature.text}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div
              className={`w-full flex flex-col justify-center bg-[#ffc1a7] md:bg-transparent p-2 rounded-lg relative ${
                isEven
                  ? 'order-2 md:order-2 items-center md:items-end text-center md:text-right'
                  : 'order-1 md:order-1 items-center md:items-start text-center md:text-left'
              }`}
            >
              <div className="h-0 hidden md:h-[30px]" />
              <div className={`relative`}>
                <img
                  src={image}
                  alt="Saffron"
                  className={`w-full md:mt-0 max-w-[250px] md:max-w-none mx-auto sm:mx-0 ${
                    isFirstImage ? 'mt-0 md:mt-0' : ''
                  } ${imageClass ? `md:${imageClass.replace(imageClass, '')}` : ''}`}
                  style={{
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatureSection;
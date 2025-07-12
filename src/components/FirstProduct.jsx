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
    <section className="py-12 relative z-10 flex items-center overflow-x-hidden">
      <div className={`container px-4 sm:px-6 ${isEven ? 'md:ml-[57px]' : ''}`}>
        <div className={`border-2 border-black rounded-[20px] bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0)]`}>
          <div
            className={`flex flex-row md:flex-row gap-6 md:gap-120 lg:gap-16 items-start p-4 sm:p-6 ${isEven ? 'md:ml-[0]' : ''}`}
          >
            {/* Text Section */}
            <div
              className={`w-full space-y-4 text-[#ffc1a7] bg-white p-4 rounded-lg ${isEven
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
                    className="flex items-start gap-1 md:gap-3 space-y-2"
                  >
                    <div 
                      className="flex-shrink-0 mt-0.5 cursor-pointer"
                      onClick={feature.onClick}
                    >
                      {feature.icon === 'link' ? (
                        <Link className="text-black w-2 h-2 md:w-4 md:h-4" />
                      ) : (
                        <MoveRight className="text-black w-2 h-2 md:w-4 md:h-4" />
                      )}
                    </div>

                    <p
                      className="md:text-[16px] text-[8px] text-black leading-snug break-words cursor-pointer"
                      onClick={feature.onClick}
                    >
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section with conditional sizing */}
            <div
              className={`w-full flex flex-col justify-center bg-[#ffc1a7] p-4 rounded-lg ${isEven
                ? 'order-2 md:order-2 items-center md:items-end text-center md:text-right'
                : 'order-1 md:order-1 items-center md:items-start text-center md:text-left'
                }`}
            >
              <div className="h-0 hidden md:h-[100px]" />
              <div className={`relative ${isFourthImage ? ' md:min-h-[400px]' : ''}`}>
                <img
                  src={image}
                  alt="Saffron"
                  className={`w-full ${isFourthImage ? 'max-w-[300px]' : 'max-w-[250px]'} mx-auto sm:mx-0 sm:ml-[-30px] sm:${isFourthImage ? 'max-w-[350px]' : 'max-w-[350px]'} md:${isFourthImage ? 'max-w-[380px]' : 'max-w-[450px]'} lg:${isFourthImage ? 'max-w-[400px]' : 'max-w-[500px]'} h-auto object-contain ${isFirstImage ? 'mt-0 md:mt-40' : ''} ${imageClass || ''}`}
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
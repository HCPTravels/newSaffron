import React from 'react';

const BlogCard = ({
    title,
    description,
    imageUrl,
    date
}) => {
    return (
        <div className="bg-[#ff6523] px-1 sm:px-4 md:px-8 py-4 flex items-center justify-center">
            <div className="max-w-4xl w-[98vw] sm:w-[95vw] md:w-full shadow-2xl rounded-2xl bg-white border-1 border-white overflow-hidden">
                <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden">
                    {/* Image Section */}
                    <div className="lg:w-1/2 p-2 sm:p-4 md:p-6">
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-xl border-2 border-[#ff6523] bg-[#ff6523]"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                        <div className="mb-3 sm:mb-4 md:mb-6 flex flex-col items-start text-left space-y-2 md:space-y-4">
                            <p className="text-xs md:text-sm font-medium text-gray-500 tracking-wider uppercase">
                                {date}
                            </p>

                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {title}
                            </h2>

                            <button className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-[#ff6523] text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 group">
                                Discover
                                <svg
                                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-gray-600 text-left leading-relaxed text-sm sm:text-base md:text-lg">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
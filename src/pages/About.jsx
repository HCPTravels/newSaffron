import React from "react";
import SaffronFlower from "../assets/bowlSaffron.png";
import saffronHome from "../assets/saffronHome.png"; // Adjust the path as necessary    

const About = () => {
    return (
        <div className="relative min-h-screen">
            {/* Fixed Background Image */}
            {/* <div 
                className="fixed inset-0 bg-[#ff6523] overflow-hidden -z-10"
                style={{
                    backgroundImage: `url(${SaffronFlower})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    opacity: 0.15,
                }}
            ></div> */}

             <img
                            src={saffronHome}
                            alt="Decorative Saffron"
                            className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                                                       md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                                                       object-cover pointer-events-none opacity-30 z-30"
                        />
                         <img
                            src={saffronHome}
                            alt="Decorative Saffron"
                            className="fixed bottom-[-75px] right-[-75px] w-[150px] h-[150px]
                                                       top-[0px] md:left-[1250px] md:w-[375px] md:h-[375px]
                                                       object-cover pointer-events-none opacity-30 z-30"
                        />

            {/* Content Container */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="flex items-center justify-center px-4 sm:px-6 mt-50 md:mt-50 pb-16">
                    <div className="max-w-7xl mx-auto text-center px-4">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight drop-shadow-lg">
                            ABOUT US
                        </h1>
                        <div className="max-w-2xl mx-auto">
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8 sm:mb-12">
                                Bringing you the world's finest Kashmir saffron, where each strand tells a story of heritage and excellence.
                            </p>
                            <button className="bg-white text-[#ff6523] hover:bg-black hover:text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-xl sm:shadow-2xl">
                                Discover Our Legacy
                            </button>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <div className="bg-[#ff6523]/90 backdrop-blur-sm pb-12">
                    {/* Premium Content Section */}
                    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                            {/* Heritage Card */}
                            <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/30 shadow-lg hover:shadow-xl sm:hover:shadow-3xl transition-all duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff6523] rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our Heritage</h2>
                                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                                            For generations, our family has cultivated the rarest saffron in Kashmir's Pampore valley, 
                                            where altitude and climate create the world's most potent strands.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quality Card */}
                            <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/30 shadow-lg hover:shadow-xl sm:hover:shadow-3xl transition-all duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff6523] rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Unrivaled Quality</h2>
                                        <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                                            Each strand is hand-selected, with crocin levels exceeding 300+ for unparalleled color, 
                                            aroma, and flavor that defines true Kashmiri saffron.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {[
                                { value: "300+", label: "Crocin Level" },
                                { value: "0", label: "Additives" },
                                { value: "A++", label: "Quality Grade" },
                                { value: "24h", label: "Harvest to Seal" }
                            ].map((stat, index) => (
                                <div key={index} className="bg-white/95 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-center border border-white/30 shadow-md hover:shadow-lg sm:hover:shadow-2xl transition-all duration-300">
                                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#ff6523] mb-2 sm:mb-4">{stat.value}</div>
                                    <div className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 max-w-4xl mx-auto">
                        <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 border border-white/30 shadow-xl sm:shadow-2xl md:shadow-3xl text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10">Our Sacred Promise</h2>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-10 md:mb-12">
                                To honor centuries of tradition while innovating for the future, delivering saffron so pure 
                                it transforms every dish into a masterpiece and every moment into a celebration.
                            </p>
                            <button className="bg-[#ff6523] hover:bg-gray-900 text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg sm:shadow-xl md:shadow-2xl">
                                Experience the Gold Standard
                            </button>
                        </div>
                    </section>

                    {/* Values Section */}
                    <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 sm:mb-16 md:mb-20 drop-shadow-lg">Our Pillars of Excellence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                            {[
                                { icon: "🌿", title: "Purity", text: "Absolutely no blending or additives - just 100% pure Kashmir saffron" },
                                { icon: "🤝", title: "Heritage", text: "Direct from multi-generational family farms in Pampore" },
                                { icon: "✨", title: "Potency", text: "Harvested at peak season for maximum medicinal properties" }
                            ].map((value, index) => (
                                <div key={index} className="bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/30 shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 text-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{value.title}</h3>
                                    <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">{value.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 md:mb-10 drop-shadow-lg">Ready for the Ultimate Saffron Experience?</h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                            Join chefs and connoisseurs worldwide who trust our saffron to elevate their craft.
                        </p>
                        <button className="bg-white hover:bg-black text-[#ff6523] hover:text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-full text-base sm:text-lg md:text-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg sm:shadow-xl md:shadow-2xl">
                            Shop the Finest Strands
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
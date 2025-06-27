import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Handshake, Award, Globe, ArrowRight } from "lucide-react";
import saffron from "../assets/saffron.png"; // Adjust the path as necessary
import SaffronIcon from "../assets/icons8-saffron-64 (1).png"; // Adjust the path as necessary

const OurPartners = () => {
  // Sample partner data
  const partners = [
    {
      id: 1,
      name: "Kashmir Heritage Farms",
      logo:saffron,
      description: "Multi-generational saffron growers in Pampore valley",
      since: 1995
    },
    {
      id: 2,
      name: "Golden Thread Exporters",
      logo: saffron,
      description: "Premium spice exporters with global distribution",
      since: 2008
    },
    {
      id: 3,
      name: "Organic Certification Board",
      logo: saffron,
      description: "Ensuring 100% organic cultivation practices",
      since: 2012
    },
    {
      id: 4,
      name: "Luxury Culinary Group",
      logo: saffron,
      description: "Supplying Michelin-starred restaurants worldwide",
      since: 2015
    },
    {
      id: 5,
      name: "Sustainable Agriculture Initiative",
      logo: saffron,
      description: "Promoting eco-friendly farming techniques",
      since: 2018
    },
    {
      id: 6,
      name: "Global Spice Alliance",
      logo: saffron,
      description: "Setting international quality standards",
      since: 2020
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative min-h-screen mt-20 bg-gradient-to-br from-[#ff6523] via-[#fe6522] to-[#e55a1d] overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-white/4 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div 
          className="max-w-7xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6"
            variants={itemVariants}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center sm:text-left">
              Our Valued Partners
            </h1>
          </motion.div>
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            variants={itemVariants}
          >
            Collaborating with the finest growers, exporters, and institutions to bring you the world's premium saffron.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16 lg:mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {[
            { icon: <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />, value: "15+", label: "Years Experience" },
            { icon: <Handshake className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />, value: "50+", label: "Trusted Partners" },
            { icon: <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />, value: "A++", label: "Quality Grade" },
            { icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />, value: "12", label: "Countries Served" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/30 shadow-lg"
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" 
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[#ff6523] mb-2 sm:mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          className="max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/30 shadow-xl"
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" 
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Partner header */}
                <div className="bg-gradient-to-r from-[#fe6522] to-[#e55a1d] p-4 sm:p-5">
                  <div className="flex items-center">
                    <div className="bg-white/95 p-2 sm:p-3 rounded-xl mr-3 sm:mr-4 shadow-lg">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white truncate">{partner.name}</h3>
                      <p className="text-white/90 text-xs sm:text-sm">Since {partner.since}</p>
                    </div>
                  </div>
                </div>

                {/* Partner content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2">
                    <span className="text-xs font-medium text-[#ff6523] bg-[#ff6523]/10 px-3 py-1.5 rounded-full self-start">
                      Certified Partner
                    </span>
                    <motion.button
                      className="text-sm font-medium text-[#ff6523] hover:text-[#e55a1d] transition-colors flex items-center gap-1 self-start sm:self-auto"
                      whileHover={{ x: 2 }}
                    >
                      Visit Website 
                      <ArrowRight className="h-3 w-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/30 shadow-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Become a Partner
            </h2>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our network of premium saffron producers and distributors worldwide.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium shadow-lg text-sm sm:text-base hover:shadow-xl transition-shadow"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(254, 101, 34, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Partnership Team
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurPartners;
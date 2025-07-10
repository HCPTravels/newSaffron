import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, Droplet, Lock, Package, Lightbulb, Star, Eye, Leaf, Thermometer } from 'lucide-react';
import tin from '../assets/tin.jpg';
import glass from '../assets/glass.jpeg';
import glass2 from '../assets/glass2.jpg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "backOut" }
  }
};

const slideInFromLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const slideInFromRight = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const rotateIn = {
  hidden: { rotate: -5, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const SaffronPackaging = () => {
  return (
    <motion.div 
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Custom styles - add to your CSS file */}
      <style jsx global>{`
        .clip-diagonal-br {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
        }
        .clip-notch-tr {
          clip-path: polygon(0 0, 100% 0, 100% 30%, 70% 0, 0 30%);
        }
        .polaroid-shadow {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mt-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-medium"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4" />
              Premium Preservation
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              variants={itemVariants}
            >
              Why Saffron Packaging <span className="text-[#ff6523]">Matters</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              Saffron, the luxurious spice derived from the Crocus sativus flower, demands meticulous packaging to preserve its exceptional qualities. Sensitive to light, air, and moisture, saffron's vibrant color, potent aroma, and rich flavor can degrade without proper protection.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-2 text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Thermometer className="h-5 w-5 text-orange-500" />
                <span>Temperature controlled</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Eye className="h-5 w-5 text-orange-500" />
                <span>Light protected</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 text-gray-700"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Lock className="h-5 w-5 text-orange-500" />
                <span>Tamper-proof</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            variants={slideInFromRight}
          >
            {/* Hero image with diagonal cut */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-orange-100 clip-diagonal-br z-0"></div>
              
              <motion.div 
                className="relative z-10 w-full h-full rounded-tl-[40px] rounded-br-[40px] rounded-tr-lg rounded-bl-lg overflow-hidden shadow-xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={tin}
                  alt="Premium saffron packaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Premium Metal Tins</h3>
                    <p className="text-gray-200">UV-blocking protection for maximum freshness</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-200 rounded-full opacity-30 z-0"
                animate={{
                  y: [0, -10, 0],
                  x: [0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -top-4 -left-4 w-16 h-16 bg-orange-300 rounded-full opacity-20 z-0"
                animate={{
                  y: [0, 10, 0],
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Preservation Features */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Role of Packaging in Saffron Preservation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-quality packaging ensures that saffron retains its premium characteristics from harvest to your kitchen.
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Shielding from UV Light</h3>
                  <p className="text-gray-600 mt-1">
                    Clear glass or plastic containers can allow UV rays to penetrate, diminishing saffron's vivid hue and potency. Premium saffron is stored in UV-blocking metal tins or dark glass jars to safeguard its color and fragrance.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Preserving Aroma and Flavor</h3>
                  <p className="text-gray-600 mt-1">
                    Saffron's delicate scent and taste are vulnerable to air exposure and external odors. Airtight packaging prevents oxidation and contamination, maintaining the spice's signature intensity.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative group"
              variants={slideInFromRight}
            >
              {/* Notched corner image */}
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none"></div>
                <img
                  src={glass}
                  alt="Dark glass saffron packaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 w-16 h-16 bg-white clip-notch-tr"></div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 w-28 h-28 bg-orange-100 rounded-full opacity-20 z-0 group-hover:opacity-30 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.25, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="relative group"
              variants={slideInFromLeft}
            >
              {/* Polaroid style image */}
              <motion.div 
                className="relative aspect-[4/3] bg-white p-4 polaroid-shadow rounded-lg border border-gray-100 transform rotate-1 group-hover:rotate-0 transition-transform duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-full h-full rounded-md overflow-hidden">
                  <img
                    src={glass2}
                    alt="Vacuum sealed saffron"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-md border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-gray-700">Vacuum Sealed</span>
                </motion.div>
              </motion.div>
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 bg-orange-300 rounded-full opacity-70"
                animate={{
                  y: [0, -5, 0],
                  x: [0, -3, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-amber-400 rounded-full opacity-70"
                animate={{
                  y: [0, 5, 0],
                  x: [0, 3, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              ></motion.div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Moisture Protection</h3>
                  <p className="text-gray-600 mt-1">
                    Humidity can cause saffron threads to clump, lose texture, or develop mold. Packaging designed to block moisture ensures the spice remains dry and pristine.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Lock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Ensuring Authenticity</h3>
                  <p className="text-gray-600 mt-1">
                    Tamper-evident, secure packaging protects saffron from adulteration, a critical factor given its high value and susceptibility to counterfeiting.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              variants={slideInFromLeft}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Features of Premium Saffron Packaging
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">UV-Blocking Materials</h3>
                  <p className="text-gray-600">
                    Metal tins or dark glass jars outperform clear containers in protecting saffron from light damage.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Airtight Seals</h3>
                  <p className="text-gray-600">
                    These ensure long-lasting freshness and prevent contamination.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Small Batch Packaging</h3>
                  <p className="text-gray-600">
                    Smaller containers reduce frequent opening, preserving saffron's potency.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={slideInFromRight}
            >
              <motion.div 
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Best Practices for Saffron Storage
                </h3>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Thermometer className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Cool, Dry Storage</h4>
                      <p className="text-gray-600 mt-1">
                        Keep saffron in a dark, dry environment, away from heat and sunlight, to maintain its quality.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Airtight Containers</h4>
                      <p className="text-gray-600 mt-1">
                        Use tightly sealed containers to prevent air, moisture, and odor infiltration.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Eye className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Minimize Exposure</h4>
                      <p className="text-gray-600 mt-1">
                        Open containers only when necessary to reduce contact with air and light.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900 rounded-3xl p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <motion.div 
                      className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Lightbulb className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Pro Tip</h4>
                    <p className="text-gray-300">
                      When buying saffron, prioritize packaging that emphasizes protection from light, air, and moisture—a hallmark of quality and care.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#ff6523] py-16 md:py-24">
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience the Difference of Properly Packaged Saffron
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Thoughtful packaging is more than aesthetic—it's a commitment to delivering saffron's full potential.
          </p>
          <motion.button 
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Package className="h-5 w-5" />
            Discover Our Packaging
          </motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default SaffronPackaging;
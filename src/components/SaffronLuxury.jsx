import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Flower,
  Sparkles,
  MapPin,
  Clock,
  Star,
  Droplets,
  ShieldCheck,
  Award,
  Heart,
  Lightbulb,
  ChefHat,
  ArrowDown
} from 'lucide-react';

// Image imports (replace with your actual image paths)
import saffronField from '../assets/crocus.jpg';
import saffronCloseup from '../assets/stigma.jpg';
import liquid from '../assets/liquid.jpg';
import thread from '../assets/thread.jpg';
import inused from '../assets/inused.jpg';
import icecream from '../assets/icecream.jpg';
import persian from '../assets/persian.jpg';
import biryani from '../assets/biryani.jpg';
import tea from '../assets/tea1.jpg';
import saffronHarvesting from '../assets/harvesting.jpg';
import luxuary from '../assets/luxuary.jpg';
import storage from '../assets/storage.jpg';
import chef from '../assets/chef.jpg';

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

const SaffronComponent = () => {
  const sectionRefs = {
    overview: useRef(null),
    characteristics: useRef(null),
    culinary: useRef(null),
    cultivation: useRef(null),
    luxury: useRef(null),
    tips: useRef(null)
  };

  const scrollToNextSection = () => {
    const sections = Object.keys(sectionRefs);
    const nextSection = sections[0];
    sectionRefs[nextSection].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <motion.img
          src={saffronField}
          alt="Saffron field with purple flowers"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <motion.div 
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl"
          variants={containerVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            variants={itemVariants}
          >
            <Crown className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-300" />
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
              variants={itemVariants}
            >
              Saffron
            </motion.h1>
            <Sparkles className="h-6 sm:h-8 w-6 sm:w-8 text-yellow-300" />
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-6 sm:mb-8 drop-shadow-md"
            variants={itemVariants}
          >
            The World's Most Luxurious Spice
          </motion.p>

          <motion.button
            onClick={scrollToNextSection}
            className="mt-4 animate-bounce flex flex-col items-center text-white hover:text-yellow-200 transition-colors"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-sm mb-1 sm:mb-2">Discover</span>
            <ArrowDown className="h-5 sm:h-6 w-5 sm:w-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-20 relative z-10 space-y-16 sm:space-y-20 md:space-y-32">
        {/* Overview Section */}
        <section
          id="overview"
          ref={sectionRefs.overview}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-20"
        >
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={saffronCloseup}
              alt="Closeup of saffron threads"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </motion.div>

          <motion.div 
            className="order-first md:order-none"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium text-sm sm:text-base">Introduction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              The Red Gold of Spices
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              Saffron, often referred to as "red gold," is the world's most precious spice. Each delicate thread is
              hand-harvested from the Crocus sativus flower, with approximately 75,000 blossoms needed to produce
              just one pound of saffron.
            </p>
            <motion.div 
              className="flex flex-wrap gap-3 sm:gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Flower className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
                <span className="text-gray-700 text-sm sm:text-base">Hand-harvested</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
                <span className="text-gray-700 text-sm sm:text-base">Exquisite flavor</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Characteristics Section */}
        <section
          id="characteristics"
          ref={sectionRefs.characteristics}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div 
            className="order-last md:order-none"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium text-sm sm:text-base">Properties</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Unique Characteristics
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Droplets,
                  title: "Vibrant Color",
                  desc: "Saffron's intense golden hue comes from crocin, a natural carotenoid dye that infuses dishes with its signature color."
                },
                {
                  icon: Heart,
                  title: "Distinct Aroma",
                  desc: "The spice contains safranal, which gives it a complex, hay-like fragrance with floral notes."
                },
                {
                  icon: Star,
                  title: "Potent Flavor",
                  desc: "Just a few threads can transform a dish with its earthy, slightly bitter taste and honey-like sweetness."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-3 gap-2 h-64 sm:h-80 md:h-96 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                src: saffronCloseup,
                alt: "Saffron threads macro view",
                label: "Color"
              },
              {
                src: thread,
                alt: "Saffron steeping in liquid",
                label: "Aroma"
              },
              {
                src: inused,
                alt: "Golden saffron rice dish",
                label: "Flavor"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`relative ${index === 0 ? 'rounded-l-2xl' : index === 2 ? 'rounded-r-2xl' : ''} overflow-hidden`}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-2 sm:p-3">
                  <span className="text-white font-medium text-xs sm:text-sm">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Culinary Section */}
        <motion.section
          id="culinary"
          ref={sectionRefs.culinary}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div
              variants={containerVariants}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-6 sm:w-8 h-0.5 bg-orange-500"></div>
                <span className="text-orange-500 font-medium text-sm sm:text-base">Cuisine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Culinary Masterpieces
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Saffron elevates both sweet and savory dishes across global cuisines. Its versatility makes it
                indispensable in gourmet cooking.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: ChefHat,
                    title: "Savory Dishes",
                    desc: "Risotto, stews, sauces"
                  },
                  {
                    icon: Star,
                    title: "Desserts",
                    desc: "Ice cream, cakes, puddings"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-3 sm:p-4 rounded-xl shadow-sm"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <item.icon className="h-5 sm:h-6 w-5 sm:w-6 text-orange-500 mb-1 sm:mb-2" />
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 aspect-[4/3] md:aspect-[5/4]"
              variants={containerVariants}
            >
              {[
                {
                  src: tea,
                  alt: "Saffron Tea",
                  label: "Saffron Tea",
                  rounded: "rounded-tl-2xl"
                },
                {
                  src: persian,
                  alt: "Persian tahdig",
                  label: "Persian Tahdig",
                  rounded: "rounded-tr-2xl"
                },
                {
                  src: biryani,
                  alt: "Indian biryani",
                  label: "Indian Biryani",
                  rounded: "rounded-bl-2xl"
                },
                {
                  src: icecream,
                  alt: "Persian saffron ice cream",
                  label: "Saffron Ice Cream",
                  rounded: "rounded-br-2xl"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`relative ${item.rounded} overflow-hidden`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3">
                    <p className="text-white font-medium text-xs sm:text-sm">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Cultivation Section */}
        <section
          id="cultivation"
          ref={sectionRefs.cultivation}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div 
            className="relative rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={saffronHarvesting}
              alt="Harvesting saffron flowers"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium text-sm sm:text-base">Production</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              The Art of Harvesting
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Global Origins",
                  desc: "Iran produces 90% of the world's saffron, with significant cultivation in Spain, India, and Greece."
                },
                {
                  icon: Clock,
                  title: "Seasonal Harvest",
                  desc: "The crocus blooms for just 1-2 weeks in autumn, with flowers picked at dawn before they fully open."
                },
                {
                  icon: Flower,
                  title: "Labor Intensive",
                  desc: "Each flower produces only 3 stigmas, requiring about 40 hours of labor to harvest 150,000 flowers."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Luxury Section with #ff6523 */}
        <motion.section
          id="luxury"
          ref={sectionRefs.luxury}
          className="bg-gradient-to-br from-[#ff6523] to-amber-700 rounded-3xl p-6 md:p-12 shadow-xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              className="order-2 md:order-1"
              variants={containerVariants}
            >
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-6 sm:w-8 h-0.5 bg-orange-200"></div>
                <span className="text-orange-200 font-medium text-sm sm:text-base">Prestige</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                The Spice of Kings
              </h2>
              <p className="text-base sm:text-lg text-orange-100 mb-6 sm:mb-8 leading-relaxed">
                Saffron's rarity and exquisite qualities have made it a symbol of wealth and status throughout history.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    icon: Crown,
                    title: "Historical Value",
                    desc: "Used since 3,500 years ago"
                  },
                  {
                    icon: Award,
                    title: "Price",
                    desc: "$5,000+ per kilogram"
                  },
                  {
                    icon: ShieldCheck,
                    title: "Quality Grades",
                    desc: "Coupe, Superior, La Mancha"
                  },
                  {
                    icon: Star,
                    title: "Modern Status",
                    desc: "Michelin-star essential"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-sm"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <item.icon className="h-5 sm:h-6 w-5 sm:w-6 text-orange-200 mb-1 sm:mb-2" />
                    <h4 className="font-bold text-white text-sm sm:text-base">{item.title}</h4>
                    <p className="text-orange-100 text-xs sm:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="order-1 md:order-2 relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-80 lg:h-96"
              variants={slideInFromRight}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <img
                src={luxuary}
                alt="Saffron threads being measured"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Tips Section */}
        <section 
          id="tips"
          ref={sectionRefs.tips}
          className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12"
        >
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-6 sm:w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium text-sm sm:text-base">Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Using Saffron Like a Chef
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Activation",
                  desc: "Crush threads and soak in warm liquid (water, milk, or stock) for 15-20 minutes to release full flavor."
                },
                {
                  icon: ShieldCheck,
                  title: "Storage",
                  desc: "Keep in an airtight container away from light and heat. Properly stored saffron lasts 2-3 years."
                },
                {
                  icon: Star,
                  title: "Dosage",
                  desc: "A few threads (5-7) typically suffice for 4-6 servings. More doesn't always mean better flavor."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3 sm:gap-4 group p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2 grid grid-cols-3 gap-2 aspect-[16/9] md:aspect-[16/10]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              {
                src: liquid,
                alt: "Saffron steeping in liquid",
                label: "Activation",
                rounded: "rounded-l-2xl"
              },
              {
                src: storage,
                alt: "Proper saffron storage",
                label: "Storage"
              },
              {
                src: chef,
                alt: "Measuring saffron threads",
                label: "Dosage",
                rounded: "rounded-r-2xl"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className={`relative ${item.rounded || ''} overflow-hidden`}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-2 sm:p-3">
                  <span className="text-white font-medium text-xs sm:text-sm">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-br from-[#ff6523] to-amber-800 text-white py-8 sm:py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div 
            className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Crown className="h-5 sm:h-6 w-5 sm:w-6 text-orange-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-orange-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Flower className="h-5 sm:h-6 w-5 sm:w-6 text-orange-200" />
            </motion.div>
          </motion.div>
          <motion.p 
            className="text-base sm:text-lg text-orange-100 mb-3 sm:mb-4"
            variants={itemVariants}
          >
            The world's most precious spice
          </motion.p>
          <motion.p 
            className="text-xs sm:text-sm text-orange-200/80"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Saffron Guide. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default SaffronComponent;
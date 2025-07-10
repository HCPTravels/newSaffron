import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Leaf, Droplets, Sun, Clock, Gauge } from "lucide-react";
import SaffronField from '../assets/saffronfield.jpg'
import Farmers from '../assets/farmers.jpg'
import dried from '../assets/dried.png'

const SaffronQuality = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFF9F5] to-[#FFF5EE] font-serif">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      {/* <div
  className="absolute inset-0 bg-cover bg-center opacity-0"
  style={{ backgroundImage: `url(${SaffronField})` }}
></div> */}
        <div className="relative mt-20 md:mt-10 max-w-7xl mx-auto px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-[#E55A1D]">Naturally Dried</span>,<br />
                <span className="text-[#FF8C42]">Traditionally Preserved</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-[#B54607] font-light mb-8">
                The Art of Kashmiri Saffron's Purity and Potency
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FF6523] to-[#E55A1D] text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Discover Our Process
              </motion.button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-[#FF8C42]/20 rounded-3xl rotate-6"></div>
              <div className="absolute -inset-4 bg-[#E55A1D]/10 rounded-3xl rotate-3"></div>
              <img 
                src={SaffronField}
                alt="Saffron fields in Pampore, Kashmir" 
                className="relative w-full rounded-2xl shadow-2xl border-8 border-white"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl leading-relaxed text-[#B54607] font-light"
          >
            Kashmiri saffron, revered as the world's most luxurious spice, is a testament to 
            centuries-old traditions and meticulous craftsmanship in Pampore, Kashmir. 
          </motion.p>
        </div>
      </div>

      {/* Art of Harvesting */}
      <div className="py-24 bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE1]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-1 bg-[#FF6523] mr-4"></div>
                <span className="text-[#FF6523] uppercase tracking-widest">Traditional Methods</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-[#2A2A2A]">
                The Art of Harvesting
              </h3>
              <p className="text-xl leading-relaxed mb-8 text-[#555555]">
                In the serene fields of Pampore, farmers hand-pick delicate crocus flowers at dawn, 
                carefully extracting the three crimson stigmas from each bloom. These fragile threads, 
                which become saffron, demand gentle handling to maintain their chemical integrity and 
                exquisite taste.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-[#FF6523] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-[#555555]">Pre-dawn harvesting to preserve freshness</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#FF6523] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-[#555555]">Only three crimson stigmas per flower</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#FF6523] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-[#555555]">Immediate processing after harvest</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-[#FF8C42]/20 rounded-3xl -rotate-3"></div>
              <img 
                src={Farmers}
                alt="Farmer harvesting saffron flowers" 
                className="relative w-full rounded-2xl shadow-xl border-8 border-white"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Natural Drying Process */}
      <div className="py-24 bg-gradient-to-br from-[#E55A1D] to-[#B54607] text-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-white/50"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Natural Drying: A Time-Honored Process
            </h3>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Our slow, natural drying method preserves the essential oils and aroma that make Kashmiri saffron unparalleled.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Sun className="h-10 w-10" />,
                title: "Sun-Kissed Perfection",
                description: "Delicately spread on mesh in shaded rooms to prevent UV damage"
              },
              {
                icon: <Clock className="h-10 w-10" />,
                title: "Patient Process",
                description: "Slow moisture evaporation over several days for optimal results"
              },
              {
                icon: <Droplets className="h-10 w-10" />,
                title: "Oil Preservation",
                description: "Essential oils and aroma compounds remain fully intact"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 mx-auto">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 text-center">{item.title}</h4>
                <p className="text-lg text-center opacity-90">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Leaf className="text-[#FFD166] mr-3" />
                <span className="text-[#FFD166]">Traditional Drying</span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-[#FFD166] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">Deeper, more vibrant crimson color</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#FFD166] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">Richer, more complex flavor profile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#FFD166] h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">Greater therapeutic potency</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <Gauge className="text-[#FF9A76] mr-3" />
                <span className="text-[#FF9A76]">Industrial Drying</span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-[#FF9A76] h-6 w-6 mr-3 mt-1 flex-shrink-0 flex items-center justify-center">✗</div>
                  <span className="text-lg">Degraded volatile oils from high heat</span>
                </li>
                <li className="flex items-start">
                  <div className="text-[#FF9A76] h-6 w-6 mr-3 mt-1 flex-shrink-0 flex items-center justify-center">✗</div>
                  <span className="text-lg">Diminished aromatic compounds</span>
                </li>
                <li className="flex items-start">
                  <div className="text-[#FF9A76] h-6 w-6 mr-3 mt-1 flex-shrink-0 flex items-center justify-center">✗</div>
                  <span className="text-lg">Reduced medicinal properties</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-1 bg-[#FF6523]"></div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#2A2A2A]">
              Preserving Saffron's Essence
            </h3>
            <p className="text-xl max-w-3xl mx-auto text-[#555555]">
              Our traditional methods ensure every strand maintains its full spectrum of qualities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🌿",
                title: "Intact Volatile Oils",
                description: "Therapeutic and aromatic qualities preserved"
              },
              {
                icon: "🔴",
                title: "Vivid Crimson Hue",
                description: "Deep, vibrant color maintained"
              },
              {
                icon: "💪",
                title: "High Potency",
                description: "Just a few threads infuse intense flavor"
              },
              {
                icon: "⏳",
                title: "Extended Shelf Life",
                description: "Lasting freshness and flavor"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#FFF9F5] to-[#FFF5EE] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-white"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h4 className="text-2xl font-bold mb-3 text-[#2A2A2A]">{item.title}</h4>
                <p className="text-lg text-[#555555]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Heritage Section */}
      <div className="py-24 bg-gradient-to-br from-[#FFF5EE] to-[#FFEDE1]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -inset-6 bg-[#FF8C42]/20 rounded-3xl rotate-3"></div>
              <img 
                src={dried}
                alt="Kashmiri artisan handling saffron" 
                className="relative w-full rounded-2xl shadow-xl border-8 border-white"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center mb-8">
                <div className="w-16 h-1 bg-[#FF6523] mr-4"></div>
                <span className="text-[#FF6523] uppercase tracking-widest">Our Heritage</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 text-[#2A2A2A]">
                A Legacy of Craftsmanship
              </h3>
              <p className="text-xl leading-relaxed mb-8 text-[#555555]">
                Saffron cultivation in Kashmir is steeped in heritage, passed down through generations. 
                While tools may evolve, the core techniques remain unchanged, preserving the authenticity 
                and excellence of Kashmiri saffron as a global standard.
              </p>
              <blockquote className="italic border-l-4 border-[#FF6523] pl-6 py-3 text-[#555555] text-xl bg-white/30 rounded-r-lg">
                "Each thread is hand-harvested, naturally dried, and lovingly preserved - embodying health, 
                flavor, and heritage in every crimson strand."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaffronQuality;
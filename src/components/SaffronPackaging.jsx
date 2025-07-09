import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplet, Lock ,Home} from 'lucide-react';
import packaging1 from '../assets/saffron-packaging-1.jpg';
import packaging2 from '../assets/saffron-packaging-1.jpg';
import packaging3 from '../assets/saffron-packaging-1.jpg';

const SaffronPackaging = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      title: "UV Protection",
      description: "Metal tins and dark glass block harmful light, preserving saffron's vibrant color and potency."
    },
    {
      icon: <Home className="w-8 h-8 text-amber-600" />,
      title: "Aroma Preservation",
      description: "Airtight seals lock in the delicate fragrance that defines premium saffron."
    },
    {
      icon: <Droplet className="w-8 h-8 text-amber-600" />,
      title: "Moisture Control",
      description: "Specialized barriers prevent humidity damage and maintain perfect thread texture."
    },
    {
      icon: <Lock className="w-8 h-8 text-amber-600" />,
      title: "Tamper Evidence",
      description: "Security features guarantee authenticity of your precious saffron."
    }
  ];

  return (
    <div className="bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Sealed for Quality, Packed with Precision
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            Discover how premium packaging preserves saffron's legendary color, aroma, and flavor from field to kitchen.
          </p>
        </motion.div>

        {/* Packaging Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img src={packaging1} alt="Premium saffron tin" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-amber-900">Heritage Metal Tin</h3>
              <p className="text-amber-800 mt-2">Blocks 100% of UV light with elegant traditional design</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img src={packaging2} alt="Dark glass saffron jar" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-amber-900">UV-Block Glass Jar</h3>
              <p className="text-amber-800 mt-2">Dark glass provides light protection while showcasing quality</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img src={packaging3} alt="Sealed saffron packets" className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-amber-900">Portion-Controlled Packets</h3>
              <p className="text-amber-800 mt-2">Single-use sealed packets ensure maximum freshness</p>
            </div>
          </motion.div>
        </div>

        {/* Why Packaging Matters */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
            The Science of Saffron Preservation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Why Saffron Needs Special Protection
              </h3>
              <p className="text-amber-700 mb-4">
                As the world's most precious spice, saffron contains delicate crocin, picrocrocin, and safranal compounds that degrade when exposed to:
              </p>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Light:</strong> UV rays break down color compounds in just 48 hours of direct exposure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Oxygen:</strong> Oxidation reduces aroma potency by up to 40% monthly in poor packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Moisture:</strong> Humidity above 60% causes clumping and accelerates flavor loss</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-amber-800 mb-4">
                Our Packaging Solutions
              </h3>
              <p className="text-amber-700 mb-4">
                We combat these threats with military-grade protective features:
              </p>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Triple-layer foil:</strong> Blocks 99.9% of light and oxygen transmission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Nitrogen flushing:</strong> Removes oxygen before sealing to prevent oxidation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Desiccant packs:</strong> Maintains optimal 30-40% humidity inside packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Holographic seals:</strong> Guarantees authenticity with tamper-proof technology</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-2">{feature.title}</h3>
              <p className="text-amber-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Storage Tips */}
        <div className="bg-amber-100 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
            Expert Storage Recommendations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Ideal Conditions</h3>
              <ul className="space-y-2 text-amber-700">
                <li>• Temperature: 15-20°C (59-68°F)</li>
                <li>• Humidity: Below 40% RH</li>
                <li>• Complete darkness</li>
                <li>• Away from strong odors</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Container Choices</h3>
              <ul className="space-y-2 text-amber-700">
                <li>• Airtight metal containers (best)</li>
                <li>• Dark glass jars with rubber seals</li>
                <li>• Vacuum-sealed bags</li>
                <li>• Original packaging until first use</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Usage Tips</h3>
              <ul className="space-y-2 text-amber-700">
                <li>• Use clean, dry utensils</li>
                <li>• Reseal immediately after use</li>
                <li>• Buy in quantities you'll use within 6-12 months</li>
                <li>• Keep daily-use quantity in small container</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-amber-800 font-medium italic">
              "Properly stored premium saffron retains 95% of its quality for 2-3 years, while poorly stored saffron can lose 50% potency in just 6 months."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaffronPackaging;
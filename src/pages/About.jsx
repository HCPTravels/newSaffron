import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Pin, Award, Heart, Leaf } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "backOut" }
  }
};

const About = () => {
  const socialLinks = [
    { icon: Instagram, url: "https://www.instagram.com/kisansaffron/", label: "Instagram" },
    { icon: Facebook, url: "https://www.facebook.com/dashboard.php?id=61577939271423", label: "Facebook" },
    { icon: Twitter, url: "https://x.com/kisan_saffron", label: "Twitter" },
    { icon: Pin, url: "https://in.pinterest.com/kisansaffron/", label: "Pinterest" }
  ];

  const stats = [
    { value: "300+", label: "Crocin Level" },
    { value: "0", label: "Additives" },
    { value: "A++", label: "Quality Grade" },
    { value: "24h", label: "Harvest to Seal" }
  ];

  const values = [
    { icon: Leaf, title: "Purity", text: "100% pure Kashmir saffron with no additives or blending" },
    { icon: Award, title: "Heritage", text: "Multi-generational family farms in Pampore valley" },
    { icon: Heart, title: "Potency", text: "Peak season harvest for maximum medicinal properties" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-light text-gray-900 mb-8 tracking-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Bringing you the world's finest Kashmir saffron, where each strand tells a story of heritage and excellence.
          </motion.p>
          
          {/* Social Media Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#ff6523] hover:bg-[#ff6523] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heritage & Quality Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-[#ff6523] rounded-2xl flex items-center justify-center mb-8">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Our Heritage</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                For generations, our family has cultivated the rarest saffron in Kashmir's Pampore valley, 
                where altitude and climate create the world's most potent strands.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
            >
              <div className="w-16 h-16 bg-[#ff6523] rounded-2xl flex items-center justify-center mb-8">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Unrivaled Quality</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Each strand is hand-selected, with crocin levels exceeding 300+ for unparalleled color, 
                aroma, and flavor that defines true Kashmiri saffron.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <div className="text-5xl md:text-6xl font-light text-[#ff6523] mb-4">{stat.value}</div>
                <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-5xl font-light text-gray-900 mb-12">Our Sacred Promise</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              To honor centuries of tradition while innovating for the future, delivering saffron so pure 
              it transforms every dish into a masterpiece and every moment into a celebration.
            </p>
            <motion.button 
              className="bg-[#ff6523] hover:bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience the Gold Standard
            </motion.button>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h2 className="text-5xl font-light text-gray-900 text-center mb-20">Our Pillars of Excellence</h2>
            <div className="grid md:grid-cols-3 gap-12 mb-32">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  variants={fadeIn}
                >
                  <div className="w-20 h-20 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-8">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-6">{value.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Ready for the Ultimate Saffron Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join chefs and connoisseurs worldwide who trust our saffron to elevate their craft.
            </p>
            <motion.button 
              className="bg-white hover:bg-[#ff6523] text-[#ff6523] hover:text-white border-2 border-[#ff6523] px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop the Finest Strands
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
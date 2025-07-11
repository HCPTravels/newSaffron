import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Handshake, Award, Globe, ArrowRight, Users, Shield, Star } from "lucide-react";

const OurPartners = () => {
  // Sample partner data
  const partners = [
    {
      id: 1,
      name: "Kashmir Heritage Farms",
      description: "Multi-generational saffron growers in Pampore valley",
      since: 1995,
      type: "Grower"
    },
    {
      id: 2,
      name: "Golden Thread Exporters",
      description: "Premium spice exporters with global distribution",
      since: 2008,
      type: "Exporter"
    },
    {
      id: 3,
      name: "Organic Certification Board",
      description: "Ensuring 100% organic cultivation practices",
      since: 2012,
      type: "Certifier"
    },
    {
      id: 4,
      name: "Luxury Culinary Group",
      description: "Supplying Michelin-starred restaurants worldwide",
      since: 2015,
      type: "Distributor"
    },
    {
      id: 5,
      name: "Sustainable Agriculture Initiative",
      description: "Promoting eco-friendly farming techniques",
      since: 2018,
      type: "Sustainability"
    },
    {
      id: 6,
      name: "Global Spice Alliance",
      description: "Setting international quality standards",
      since: 2020,
      type: "Standards"
    }
  ];

  const stats = [
    { icon: Briefcase, value: "15+", label: "Years Experience" },
    { icon: Handshake, value: "50+", label: "Trusted Partners" },
    { icon: Award, value: "A++", label: "Quality Grade" },
    { icon: Globe, value: "12", label: "Countries Served" }
  ];

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

  const getTypeIcon = (type) => {
    switch (type) {
      case "Grower": return <Users className="w-5 h-5" />;
      case "Exporter": return <Globe className="w-5 h-5" />;
      case "Certifier": return <Shield className="w-5 h-5" />;
      case "Distributor": return <Star className="w-5 h-5" />;
      case "Sustainability": return <Briefcase className="w-5 h-5" />;
      case "Standards": return <Award className="w-5 h-5" />;
      default: return <Handshake className="w-5 h-5" />;
    }
  };

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
            Our Partners
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Collaborating with the finest growers, exporters, and institutions to bring you the world's premium saffron.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
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
                <div className="w-16 h-16 bg-[#ff6523] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-light text-[#ff6523] mb-2">{stat.value}</div>
                <div className="text-gray-600 text-lg font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-[#ff6523] rounded-xl flex items-center justify-center text-white">
                    {getTypeIcon(partner.type)}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    Since {partner.since}
                  </span>
                </div>
                
                <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-[#ff6523] transition-colors">
                  {partner.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {partner.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#ff6523] bg-[#ff6523]/10 px-3 py-1.5 rounded-full">
                    {partner.type}
                  </span>
                  <motion.button
                    className="text-[#ff6523] hover:text-gray-900 transition-colors flex items-center gap-1 text-sm font-medium"
                    whileHover={{ x: 2 }}
                  >
                    Learn More 
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12">
              Why Partner With Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600">Consistent A++ grade saffron with 300+ crocin levels</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600">Established distribution network across 12 countries</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Reliability</h3>
                <p className="text-gray-600">15+ years of trusted partnerships and timely delivery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Become a Partner
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our network of premium saffron producers and distributors worldwide. Let's grow together.
            </p>
            <motion.button
              className="bg-[#ff6523] hover:bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Partnership Team
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurPartners;
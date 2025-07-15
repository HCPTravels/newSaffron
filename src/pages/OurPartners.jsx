import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Handshake,
  Award,
  Globe,
  ArrowRight,
  Users,
  Shield,
  Star,
  Sprout,
  Ship,
  Package,
  BadgeCheck,
  Leaf,
  Scale,
  ShoppingBag,
} from "lucide-react";

const OurPartners = () => {
  // Sample partner data
  const partners = [
    {
      id: 1,
      name: "ABK",
      description:
        "Amin-Bin-Khalik is among the leading producers and exporters of Honey and Saffron from the northern part of India. ABK is among the best names for Saffron, Walnuts, Honey and, Morels from Kashmir - India. At Amin-Bin-Khalik (ABK), we have been selling World-class Saffron to our customers worldwide from about 50 years now, and Saffron at ABK is our forte, our speciality! They specialize in selling original Kashmir saffron, walnut kernels, morels, and honey with quality assurance.",
      since: 1971,
      Link: "https://www.abk.co.in/",
      type: "Exporter",
    },
    {
      id: 2,
      name: "Retaj Agro Farms",
      description:
        "Retaj Agro Farms is a well-established agricultural business based in Pampore, Jammu & Kashmir, specializing in the cultivation and production of premium Kashmiri saffron and dry fruits. The company is considered among the most renowned manufacturers, wholesalers, suppliers and exporters of fine quality saffron and dry fruits. 70 to 80% of their products are grown in self-owned farms and the rest is sourced from nearby farms. The company operates as a proprietorship under the leadership of Mr. Ferooz Ahmad and has an annual turnover of 1.5-5 Crores with 11-25 employees. They hold both GST registration and Import Export Code (IEC), indicating their involvement in international trade.",
      since: 1985,
      Link: "https://www.retajagrofarms.in/",
      type: "Grower",
    },
    {
      id: 3,
      name: "Koshur (Kashmir Box)",
      description:
        "Kashmir Box is a multi-product, multi-brand e-commerce marketplace from the vale of Kashmir where artisans, craftsmen, entrepreneurs and other creative Kashmiris showcase their products and skills to the global marketplace. The company was founded to promote the traditional Heritage of Kashmir and create a global marketplace for local Kashmiri artisans. They sell dry fruits, sweets, accessories, handicrafts and handloom products.",
      since: 2012,
      Link: "https://www.kashmirbox.com/",
      type: "Distributor",
    },
    {
      id: 4,
      name: "Kashmir Online Store",
      description:
        "Kashmir Online Store is an online initiative by a local entrepreneur from Kashmir, specifically based in Pampore (the saffron town). For over 5 years, Kashmir Online Store has been helping customers access quality food products to remain fit and healthy. The company specializes in authentic Kashmiri products including saffron, dry fruits, shilajit, honey, and spices. They serve a family of more than 10,000 satisfied customers and offer a unique return policy if customers are not satisfied. The business operates with offices in both Kashmir and Delhi, providing 24-hour customer support and worldwide delivery options including to the USA, UK, Australia, Dubai, and Saudi Arabia.",
      since: 2018,
      Link: "https://www.kashmironlinestore.com/",
      type: "Distributor",
    },
    {
      id: 5,
      name: "Kashmirica",
      description:
        "Kashmirica is a social impact e-commerce brand that specializes in authentic Kashmiri handicrafts and products. The company aims to make distinguished products from Kashmir valley accessible to global customers while supporting local artisans. They offer a wide range of products including handicrafts, pashminas, cricket bats, saffron, dry fruits, honey, and other traditional Kashmiri items. The company donates 2.5% of profits to improve conditions for needy artisans and works directly with craftsmen to eliminate middlemen from the supply chain.",
      since: 2019,
      Link: "https://www.kashmirica.com/",
      type: "Distributor",
    },
    {
      id: 6,
      name: "Mir Kashmir Saffron",
      description:
        "Mir Kashmir Saffron is a proprietor firm based in Pampore, Pulwama, Jammu & Kashmir, specializing in authentic Kashmiri saffron and related products. The company operates as both a manufacturer and wholesaler, offering a wide range of products including Kashmiri saffron, organic saffron, dry fruits, Kashmiri Qawah tea, shilajit resin, natural honey, walnut oil, and various other Kashmir-based natural products. They are located in the heart of the saffron-producing region of Pampore, which is known for producing some of the world's finest saffron with unique characteristics like longer stigmas, natural deep-red color, and high aroma.",
      since: 2020,
      Link: "https://www.mksaffron.com/",
      type: "Distributor",
    },
    {
      id: 7,
      name: "Aagur",
      description:
        "Aagur is a premium gourmet brand specializing in authentic Kashmiri products. 'Aagur' means 'the origin' in Kashmiri. They are growers and travellers who bring the cream-of-the-crop native varieties of saffron (kesar), walnuts, almonds, honey and more. Each product is meticulously sorted and falls into the top 10% of the year's harvest. The company operates as Aagur Gourmet (OPC) Private Limited, based in Srinagar, and sources their saffron from a single verified plantation in Pampore, Kashmir. They offer Grade A1 Kashmir Mogra Saffron and other premium products like Kashmiri walnuts, almonds, honey, spices, and artisanal jams. The company has an annual turnover of Rs. 2-5 Crore and functions as retailer, HoReCa supplier & merchant-exporter of exquisite and rare gourmet ingredients from India. ",
      since: 2021,
      Link: "https://www.aagur.com/",
      type: "Grower",
    },
  ];

  const stats = [
    { icon: Briefcase, value: "15+", label: "Years Experience" },
    { icon: Handshake, value: "50+", label: "Trusted Partners" },
    { icon: Award, value: "A++", label: "Quality Grade" },
    { icon: Globe, value: "12", label: "Countries Served" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Grower":
        return <Sprout className="w-5 h-5" />;
      case "Exporter":
        return <Ship className="w-5 h-5" />;
      case "Certifier":
        return <BadgeCheck className="w-5 h-5" />;
      case "Distributor":
        return <Package className="w-5 h-5" />;
      case "Sustainability":
        return <Leaf className="w-5 h-5" />;
      case "Standards":
        return <Scale className="w-5 h-5" />;
      case "Retailer":
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Handshake className="w-5 h-5" />;
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
            Collaborating with the finest growers, exporters, and institutions
            to bring you the world's premium saffron.
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
              <motion.div key={index} className="text-center" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#ff6523] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-light text-[#ff6523] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-lg font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8"
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

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  {partner.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#ff6523] bg-[#ff6523]/10 px-3 py-1.5 rounded-full">
                    {partner.type}
                  </span>
                  <motion.a
                    href={partner.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff6523] hover:text-gray-900 transition-colors flex items-center gap-1 text-sm font-medium"
                    whileHover={{ x: 2 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
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
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Premium Quality
                </h3>
                <p className="text-gray-600">
                  Consistent A++ grade saffron with 300+ crocin levels
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Global Reach
                </h3>
                <p className="text-gray-600">
                  Established distribution network across 12 countries
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6523] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Reliability
                </h3>
                <p className="text-gray-600">
                  15+ years of trusted partnerships and timely delivery
                </p>
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
              Join our network of premium saffron producers and distributors
              worldwide. Let's grow together.
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

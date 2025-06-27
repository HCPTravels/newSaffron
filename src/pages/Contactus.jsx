import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, CheckCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import Saffron from "../assets/saffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Message sent!", {
        description: "We'll get back to you soon.",
        duration: 3000,
        position: "top-center",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send", {
        description: "Please try again later.",
        duration: 4000,
        position: "top-right",
        style: {
          background: "linear-gradient(135deg, #ef4444, #dc2626)",
          border: "1px solid #991b1b",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socials = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5 text-[#ff6523]" />, href: "#" },
    { name: "Facebook", icon: <Facebook className="h-5 w-5 text-[#ff6523]" />, href: "#" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5 text-[#ff6523]" />, href: "#" },
  ];

  return (
    <div className="mt-20 min-h-screen p-2 md:top-0 relative overflow-x-hidden bg-[#ff6523]">
      <Toaster 
        richColors 
        closeButton 
        toastOptions={{
          style: {
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(8px)',
          },
        }}
      />

      {/* Background Image */}
      <div className="hidden sm:flex absolute inset-0 justify-center items-center z-0">
        <img 
          src={Saffron} 
          alt="Saffron background" 
          className="w-full max-w-4xl h-auto object-cover opacity-70"
        />
      </div>

      {/* Contact form container */}
      <div className="w-full mx-auto px-4 py-8 z-30 md:z-30">
        <div className="flex justify-center">
          <motion.div 
            className="w-full max-w-2xl mx-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/95">
            {/* Orange Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Contact Us</h2>
                  <p className="text-white/90 text-xs sm:text-sm mt-1">We'd love to hear from you</p>
                </div>
                <img 
                  src={SaffronIcon}
                  alt="Saffron Icon"
                  className="h-10 w-10 sm:h-16 sm:w-16 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
                />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Contact form */}
              <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#fe6522]/50 bg-white/90 text-base"
                        required
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#fe6522]/50 bg-white/90 text-base"
                        required
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                      <textarea
                        id="message"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#fe6522]/50 bg-white/90 text-base"
                        required
                      ></textarea>
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <motion.span animate={{ x: isHovered ? 2 : 0 }} transition={{ duration: 0.2 }}>
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.span>
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="p-4 sm:p-6 pb-12 bg-gray-50/80">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#ff6523] p-3 rounded-full flex-shrink-0">
                      <Mail className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Email</h4>
                      <p className="text-gray-600 text-sm">contact@premiumsaffron.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#ff6523] p-3 rounded-full flex-shrink-0">
                      <Phone className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Phone</h4>
                      <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                      <p className="text-gray-600 text-sm mt-1">Mon-Fri: 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#ff6523] p-3 rounded-full flex-shrink-0">
                      <Phone className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Office</h4>
                      <p className="text-gray-600 text-sm">123 Saffron Avenue</p>
                      <p className="text-gray-600 text-sm">Kashmir Valley, India 192121</p>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="mt-8 mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
                  <div className="flex gap-3 flex-wrap pb-4">
                    {socials.map(({ name, icon, href }) => (
                      <motion.a
                        key={name}
                        href={href}
                        className="bg-white p-3 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={name}
                      >
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
                  </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
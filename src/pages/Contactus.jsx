import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, CheckCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import Saffron from "../assets/saffron.png";
import SaffronIcon from "../assets/icons8-saffron-64 (1).png";
import saffronHome from "../assets/saffronHome.png";

const ContactFormSection = () => {
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

  return (
    <div className="relative bg-gradient-to-br from-[#ff6523]/10 to-[#ff6523]/20">
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

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <img
          src={saffronHome}
          alt="Decorative Saffron"
          className="fixed bottom-[-75px] left-[-75px] w-[150px] h-[150px]
                     md:top-[586px] md:left-[-154px] md:w-[375px] md:h-[375px]
                     object-cover pointer-events-none opacity-30 z-10"
        />
      </div>

      {/* Form Section */}
      <div className="relative z-30 max-w-4xl mx-auto pt-20 pb-12 px-4 sm:px-6">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/30 backdrop-blur-sm bg-white/95">
            {/* Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] relative overflow-hidden">
              <div className="relative z-10 flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Send Us a Message</h2>
                  <p className="text-white/90 text-sm sm:text-base mt-2">We'll respond within 24 hours</p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src={SaffronIcon}
                    alt="Saffron Icon"
                    className="h-12 w-12 sm:h-16 sm:w-16 drop-shadow-lg"
                  />
                </motion.div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent bg-white text-base placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent bg-white text-base placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <textarea
                      id="message"
                      rows="4"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent bg-white text-base placeholder-gray-400 transition-all duration-200"
                      required
                    ></textarea>
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-medium shadow-md hover:shadow-lg transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Sending...</span>
                    </div>
                  ) : (
                    <>
                      <motion.span 
                        animate={{ x: isHovered ? 5 : 0 }} 
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Send className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      </motion.span>
                      <span className="text-sm sm:text-base">Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactFormSection;
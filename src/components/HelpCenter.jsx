import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp,
  Search,
  FileText,
  Truck,
  CreditCard,
  Shield,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by going to the Orders section in your profile. Click on any order to see its current status and tracking information. We'll also send you email updates as your order progresses.",
      category: "Orders"
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all our products. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Please ensure the product is in its original packaging.",
      category: "Returns"
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within India. Express shipping (1-2 days) is available for an additional fee. International shipping typically takes 7-14 business days depending on the destination.",
      category: "Shipping"
    },
    {
      id: 4,
      question: "Are your saffron products authentic?",
      answer: "Yes, all our saffron products are 100% authentic and sourced directly from certified farms in Kashmir. We provide traceability certificates and quality assurance for all our products.",
      category: "Product Quality"
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through our payment gateway.",
      category: "Payment"
    },
    {
      id: 6,
      question: "How do I apply a coupon code?",
      answer: "During checkout, you'll see a 'Apply Coupon' field. Enter your coupon code and click 'Apply' to see the discount reflected in your total. Make sure to check the terms and conditions of each coupon.",
      category: "Coupons"
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Speak with our customer service team",
      action: "+91 98765 43210",
      color: "bg-blue-500",
      delay: 0.1
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Send us an email for detailed assistance",
      action: "support@saffron.com",
      color: "bg-green-500",
      delay: 0.2
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      action: "Start Chat",
      color: "bg-purple-500",
      delay: 0.3
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
            <p className="text-gray-600">Find answers to your questions</p>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-md border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-3 mb-8"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: method.delay }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <div className="text-orange-500 font-medium text-sm">{method.action}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find quick answers to common questions</p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    <div className="ml-4 text-gray-400">
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No results found</h3>
                <p className="text-gray-500">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: <FileText className="w-6 h-6" />, title: "Order Status", color: "bg-blue-500" },
            { icon: <Truck className="w-6 h-6" />, title: "Shipping Info", color: "bg-green-500" },
            { icon: <CreditCard className="w-6 h-6" />, title: "Payment Help", color: "bg-purple-500" },
            { icon: <Shield className="w-6 h-6" />, title: "Security", color: "bg-red-500" }
          ].map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{action.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter; 
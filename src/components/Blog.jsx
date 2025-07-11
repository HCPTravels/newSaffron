import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

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
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "backOut" }
  }
};

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Art of Harvesting Kashmir Saffron",
    excerpt: "Discover the delicate process behind cultivating the world's finest saffron in the pristine valleys of Kashmir.",
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "Kisan Saffron",
    category: "Heritage",
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "Health Benefits of Pure Saffron",
    excerpt: "Explore the remarkable medicinal properties and wellness benefits of authentic Kashmir saffron.",
    date: "March 10, 2024",
    readTime: "4 min read",
    author: "Kisan Saffron",
    category: "Health",
    image: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "Culinary Secrets with Saffron",
    excerpt: "Master the art of cooking with saffron and transform your dishes into extraordinary culinary experiences.",
    date: "March 5, 2024",
    readTime: "6 min read",
    author: "Kisan Saffron",
    category: "Culinary",
    image: "/api/placeholder/600/400"
  },
  {
    id: 4,
    title: "Quality Testing: What Makes Premium Saffron",
    excerpt: "Learn about the rigorous quality standards and testing methods that ensure our saffron's authenticity.",
    date: "February 28, 2024",
    readTime: "3 min read",
    author: "Kisan Saffron",
    category: "Quality",
    image: "/api/placeholder/600/400"
  },
  {
    id: 5,
    title: "Sustainable Farming Practices",
    excerpt: "How we preserve traditional farming methods while embracing sustainable practices for future generations.",
    date: "February 20, 2024",
    readTime: "5 min read",
    author: "Kisan Saffron",
    category: "Sustainability",
    image: "/api/placeholder/600/400"
  },
  {
    id: 6,
    title: "The Journey from Farm to Table",
    excerpt: "Follow the complete journey of saffron from our Kashmir farms to your kitchen table.",
    date: "February 15, 2024",
    readTime: "4 min read",
    author: "Kisan Saffron",
    category: "Process",
    image: "/api/placeholder/600/400"
  }
];

const BlogCard = ({ post, index }) => {
  return (
    <motion.article 
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
      variants={scaleIn}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
          <div className="w-20 h-20 bg-[#ff6523] rounded-full flex items-center justify-center">
            <span className="text-white font-light text-2xl">S</span>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#ff6523]">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h2 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-[#ff6523] transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff6523] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-gray-600 font-medium">{post.author}</span>
          </div>
          
          <motion.button 
            className="flex items-center gap-2 text-[#ff6523] font-medium hover:gap-3 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-light text-gray-900 mb-8 tracking-tight"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <span className="block md:inline">BL</span>
            <span className="block md:inline text-[#ff6523]">OG</span>
          </motion.h1>
          
          <motion.div
            className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            <p className="mb-2">Latest News</p>
            <p>and Updates</p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on saffron cultivation, recipes, and wellness tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff6523] focus:border-transparent text-lg"
              />
              <motion.button
                className="bg-[#ff6523] hover:bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
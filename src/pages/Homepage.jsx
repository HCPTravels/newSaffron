import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, Zap, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'sonner';

// Extended data for saffron products with more variety
const saffronProducts = [
  { id: 1, name: 'Premium Kashmiri Saffron', price: 25, grade: 'premium', origin: 'Kashmir', crocin: 320, rating: 4.9 },
  { id: 2, name: 'Royal Persian Saffron', price: 22, grade: 'category1', origin: 'Iran', crocin: 290, rating: 4.8 },
  { id: 3, name: 'Spanish Coupe Saffron', price: 18, grade: 'category2', origin: 'Spain', crocin: 250, rating: 4.6 },
  { id: 4, name: 'Mongra Kashmiri Saffron', price: 28, grade: 'premium', origin: 'Kashmir', crocin: 350, rating: 5.0 },
  { id: 5, name: 'Super Negin Saffron', price: 24, grade: 'premium', origin: 'Iran', crocin: 310, rating: 4.9 },
  { id: 6, name: 'Organic Spanish Saffron', price: 20, grade: 'category1', origin: 'Spain', crocin: 270, rating: 4.7 },
  { id: 7, name: 'Sargol Premium Saffron', price: 26, grade: 'premium', origin: 'Iran', crocin: 330, rating: 4.9 },
  { id: 8, name: 'Kashmir Gold Saffron', price: 30, grade: 'premium', origin: 'Kashmir', crocin: 360, rating: 5.0 },
  { id: 9, name: 'Mancha Superior Saffron', price: 19, grade: 'category1', origin: 'Spain', crocin: 260, rating: 4.5 },
  { id: 10, name: 'Pushal Select Saffron', price: 21, grade: 'category1', origin: 'Iran', crocin: 280, rating: 4.7 },
  { id: 11, name: 'Lacha Premium Saffron', price: 23, grade: 'category1', origin: 'Kashmir', crocin: 300, rating: 4.8 },
  { id: 12, name: 'Coupe Superior Saffron', price: 17, grade: 'category3', origin: 'Spain', crocin: 240, rating: 4.4 },
  { id: 13, name: 'Negin Royal Saffron', price: 29, grade: 'premium', origin: 'Iran', crocin: 340, rating: 4.9 },
  { id: 14, name: 'Pampore Special Saffron', price: 32, grade: 'premium', origin: 'Kashmir', crocin: 370, rating: 5.0 },
  { id: 15, name: 'Azafrán Puro Saffron', price: 16, grade: 'category3', origin: 'Spain', crocin: 230, rating: 4.3 },
  { id: 16, name: 'Safran Elite Saffron', price: 27, grade: 'premium', origin: 'Iran', crocin: 325, rating: 4.8 },
  { id: 17, name: 'Kashmir Crown Saffron', price: 35, grade: 'premium', origin: 'Kashmir', crocin: 380, rating: 5.0 },
  { id: 18, name: 'Mancha Select Saffron', price: 15, grade: 'category3', origin: 'Spain', crocin: 220, rating: 4.2 },
  { id: 19, name: 'Persian Jewel Saffron', price: 25, grade: 'premium', origin: 'Iran', crocin: 315, rating: 4.9 },
  { id: 20, name: 'Srinagar Pure Saffron', price: 31, grade: 'premium', origin: 'Kashmir', crocin: 355, rating: 4.9 },
];

const saffronGrades = [
  { value: "premium", label: "Premium (Sargol)" },
  { value: "category1", label: "Category I (Pushal)" },
  { value: "category2", label: "Category II" },
  { value: "category3", label: "Category III" },
  { value: "bunch", label: "Bunch (Dasteh)" }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const filteredProducts = saffronProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = 
      priceFilter === 'all' || 
      (priceFilter === 'under20' && product.price < 20) ||
      (priceFilter === '20to25' && product.price >= 20 && product.price <= 25) ||
      (priceFilter === 'over25' && product.price > 25);
    const matchesOrigin = originFilter === 'all' || product.origin === originFilter;
    const matchesGrade = gradeFilter === 'all' || product.grade === gradeFilter;
    
    return matchesSearch && matchesPrice && matchesOrigin && matchesGrade;
  });

  const handleAddToCart = (product) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster richColors closeButton />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            World's Finest Saffron
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover premium saffron from Kashmir, Iran, and Spain. Each thread carefully selected for exceptional quality and flavor.
          </p>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-0 z-40 py-6 px-4 bg-white shadow-sm">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Enhanced Search Bar */}
            <motion.div 
              className="relative flex-1 max-w-lg w-full"
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search premium saffron varieties..."
                className="block w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>

            {/* Modern Filter Button */}
            <motion.button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                showFilters 
                  ? 'bg-[#fe6522] text-white shadow-lg shadow-[#fe6522]/25' 
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>

          {/* Enhanced Filter Options */}
          {showFilters && (
            <motion.div 
              className="mt-6 p-6 bg-white rounded-xl border border-gray-200 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Price Range</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under20">Under ₹20</option>
                    <option value="20to25">₹20 - ₹25</option>
                    <option value="over25">Over ₹25</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Origin</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    value={originFilter}
                    onChange={(e) => setOriginFilter(e.target.value)}
                  >
                    <option value="all">All Origins</option>
                    <option value="Kashmir">Kashmir</option>
                    <option value="Iran">Iran</option>
                    <option value="Spain">Spain</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Grade</label>
                  <select 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                  >
                    <option value="all">All Grades</option>
                    {saffronGrades.map((grade) => (
                      <option key={grade.value} value={grade.value}>
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Product Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 overflow-hidden">
                  {/* Large Origin Letter */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black text-amber-500/20 group-hover:text-amber-500/30 transition-colors duration-300">
                      {product.origin.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      product.grade === 'premium' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                        : product.grade === 'category1' 
                        ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {product.grade === 'premium' && <Zap className="w-3 h-3 mr-1" />}
                      {product.grade === 'premium' && 'Premium'}
                      {product.grade === 'category1' && 'Category I'}
                      {product.grade === 'category2' && 'Category II'}
                      {product.grade === 'category3' && 'Category III'}
                      {product.grade === 'bunch' && 'Bunch'}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-800 font-semibold">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#fe6522] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 font-medium">{product.origin}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                        {product.crocin} Crocin
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <div className="text-sm text-gray-500">per gram</div>
                    </div>
                    <motion.button 
                      className="px-4 py-2 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white text-sm font-semibold rounded-lg transition-all duration-300"
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Add to Cart"
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
              <motion.button 
                onClick={() => {
                  setSearchTerm('');
                  setPriceFilter('all');
                  setOriginFilter('all');
                  setGradeFilter('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 py-12 px-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-gray-200">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] rounded-full"></div>
            <span className="text-lg font-bold text-gray-800">Premium Saffron Marketplace</span>
          </div>
          <p className="text-gray-600">Sourced globally • Delivered fresh • Trusted quality since 2020</p>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Star, Zap } from 'lucide-react';

// Extended data for saffron products with more variety
const saffronProducts = [
  { id: 1, name: 'Premium Kashmiri', price: 25, grade: 'A++', origin: 'Kashmir', crocin: 320, rating: 4.9 },
  { id: 2, name: 'Royal Persian', price: 22, grade: 'A+', origin: 'Iran', crocin: 290, rating: 4.8 },
  { id: 3, name: 'Spanish Coupe', price: 18, grade: 'A', origin: 'Spain', crocin: 250, rating: 4.6 },
  { id: 4, name: 'Mongra Kashmiri', price: 28, grade: 'A++', origin: 'Kashmir', crocin: 350, rating: 5.0 },
  { id: 5, name: 'Super Negin', price: 24, grade: 'A++', origin: 'Iran', crocin: 310, rating: 4.9 },
  { id: 6, name: 'Organic Spanish', price: 20, grade: 'A+', origin: 'Spain', crocin: 270, rating: 4.7 },
  { id: 7, name: 'Sargol Premium', price: 26, grade: 'A++', origin: 'Iran', crocin: 330, rating: 4.9 },
  { id: 8, name: 'Kashmir Gold', price: 30, grade: 'A++', origin: 'Kashmir', crocin: 360, rating: 5.0 },
  { id: 9, name: 'Mancha Superior', price: 19, grade: 'A+', origin: 'Spain', crocin: 260, rating: 4.5 },
  { id: 10, name: 'Pushal Select', price: 21, grade: 'A+', origin: 'Iran', crocin: 280, rating: 4.7 },
  { id: 11, name: 'Lacha Premium', price: 23, grade: 'A+', origin: 'Kashmir', crocin: 300, rating: 4.8 },
  { id: 12, name: 'Coupe Superior', price: 17, grade: 'A', origin: 'Spain', crocin: 240, rating: 4.4 },
  { id: 13, name: 'Negin Royal', price: 29, grade: 'A++', origin: 'Iran', crocin: 340, rating: 4.9 },
  { id: 14, name: 'Pampore Special', price: 32, grade: 'A++', origin: 'Kashmir', crocin: 370, rating: 5.0 },
  { id: 15, name: 'Azafrán Puro', price: 16, grade: 'A', origin: 'Spain', crocin: 230, rating: 4.3 },
  { id: 16, name: 'Safran Elite', price: 27, grade: 'A++', origin: 'Iran', crocin: 325, rating: 4.8 },
  { id: 17, name: 'Kashmir Crown', price: 35, grade: 'A++', origin: 'Kashmir', crocin: 380, rating: 5.0 },
  { id: 18, name: 'Mancha Select', price: 15, grade: 'A', origin: 'Spain', crocin: 220, rating: 4.2 },
  { id: 19, name: 'Persian Jewel', price: 25, grade: 'A++', origin: 'Iran', crocin: 315, rating: 4.9 },
  { id: 20, name: 'Srinagar Pure', price: 31, grade: 'A++', origin: 'Kashmir', crocin: 355, rating: 4.9 },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen">
      {/* Modern Floating Navigation */}
      {/* <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-800">Premium Saffron Marketplace</span>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold  bg-clip-text text-white/90 mb-6 leading-tight">
            World's Finest Saffron
          </h1>
          <p className="text-lg hidden md:block md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover premium saffron from Kashmir, Iran, and Spain. Each thread carefully selected for exceptional quality and flavor.
          </p>
        </div>
      </div>

      {/* Modern Search and Filter Section */}
      <div className="sticky top-0 z-40 py-6 px-4 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Enhanced Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search premium saffron varieties..."
                className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Modern Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                showFilters 
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Enhanced Filter Options */}
          {showFilters && (
            <div className="mt-6 p-8 bg-white rounded-3xl border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800">Price Range</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 hover:border-gray-300"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="under20">Under $20</option>
                    <option value="20to25">$20 - $25</option>
                    <option value="over25">Over $25</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800">Origin</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 hover:border-gray-300"
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
                  <label className="block text-sm font-semibold text-gray-800">Grade</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-200 hover:border-gray-300"
                    value={gradeFilter}
                    onChange={(e) => setGradeFilter(e.target.value)}
                  >
                    <option value="all">All Grades</option>
                    <option value="A++">A++</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modern Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Modern Product Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 overflow-hidden">
                  {/* Floating Design Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-50"></div>
                  </div>
                  
                  {/* Large Origin Letter */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black text-amber-500/20 group-hover:text-amber-500/30 transition-colors duration-300">
                      {product.origin.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Modern Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      product.grade === 'A++' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                        : product.grade === 'A+' 
                        ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {product.grade === 'A++' && <Zap className="w-3 h-3 mr-1" />}
                      {product.grade}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-800 font-semibold">{product.rating}</span>
                  </div>
                </div>

                {/* Enhanced Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
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
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      <div className="text-sm text-gray-500">per gram</div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your search terms or filters to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setPriceFilter('all');
                  setOriginFilter('all');
                  setGradeFilter('all');
                }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modern Footer */}
      <footer className="mt-20 py-12 px-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            <span className="text-lg font-bold text-gray-800">Premium Saffron Marketplace</span>
          </div>
          <p className="text-gray-600">Sourced globally • Delivered fresh • Trusted quality since 2020</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
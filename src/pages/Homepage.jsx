import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Star, Zap } from 'lucide-react';

// Mock data for saffron products
const saffronProducts = [
  { id: 1, name: 'Premium Kashmiri', price: 25, grade: 'A++', origin: 'Kashmir', crocin: 320, rating: 4.9 },
  { id: 2, name: 'Royal Persian', price: 22, grade: 'A+', origin: 'Iran', crocin: 290, rating: 4.8 },
  { id: 3, name: 'Spanish Coupe', price: 18, grade: 'A', origin: 'Spain', crocin: 250, rating: 4.6 },
  { id: 4, name: 'Mongra Kashmiri', price: 28, grade: 'A++', origin: 'Kashmir', crocin: 350, rating: 5.0 },
  { id: 5, name: 'Super Negin', price: 24, grade: 'A++', origin: 'Iran', crocin: 310, rating: 4.9 },
  { id: 6, name: 'Organic Spanish', price: 20, grade: 'A+', origin: 'Spain', crocin: 270, rating: 4.7 },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#ff6523] via-[#ff6523] to-[#e55a1f]">
      {/* Header */}
      <div className="bg-gradient-to-r hidden md:block from-[#ff6523]/90 via-[#ff6523] to-[#e55a1f]/90 py-12 px-4">
        <div className="max-w-6xl mx-auto text-black/90  text-center">
          <h1 className="text-5xl md:block hidden md:text-7xl font-bold text-black/90  mb-4 drop-shadow-lg">
            Premium Saffron
          </h1>
          <p className="text-black/90 hidden md:block text-xl max-w-2xl mx-auto font-medium">
            Discover the world's finest saffron collection, sourced directly from premium farms
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="sticky top-0 z-10 bg-[#ff6523]/95 backdrop-blur-xl border-b border-[#e55a1f] py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-black/60" />
              </div>
              <input
                type="text"
                placeholder="Search premium saffron..."
                className="block w-full pl-12 pr-4 py-3 text-black bg-white/95 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all placeholder:text-black/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 transition-all font-medium ${
                showFilters 
                  ? 'bg-white border-white text-black shadow-lg' 
                  : 'bg-white/10 border-white/50 text-white hover:bg-white/20 hover:border-white'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xl">
              <div>
                <label className="block text-sm font-bold text-black mb-2">Price Range</label>
                <select 
                  className="w-full text-black bg-white border-2 border-[#ff6523]/20 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6523] focus:border-[#ff6523] font-medium"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="under20">Under $20</option>
                  <option value="20to25">$20 - $25</option>
                  <option value="over25">Over $25</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-black mb-2">Origin</label>
                <select 
                  className="w-full text-black bg-white border-2 border-[#ff6523]/20 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6523] focus:border-[#ff6523] font-medium"
                  value={originFilter}
                  onChange={(e) => setOriginFilter(e.target.value)}
                >
                  <option value="all">All Origins</option>
                  <option value="Kashmir">Kashmir</option>
                  <option value="Iran">Iran</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-black mb-2">Grade</label>
                <select 
                  className="w-full text-black bg-white border-2 border-[#ff6523]/20 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff6523] focus:border-[#ff6523] font-medium"
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
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white/98 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-3 border-2 border-white/80 hover:border-white relative"
              >
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ff6523]/5 via-transparent to-[#e55a1f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Product Image Area */}
                <div className="relative h-28 sm:h-36 lg:h-44 bg-gradient-to-br from-[#ff6523]/15 via-[#ff6523]/8 to-[#e55a1f]/15 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff6523]/20 via-transparent to-[#ff6523]/5"></div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#ff6523]/30"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[#e55a1f]/40"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6523]/20 to-transparent"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#ff6523]/50 group-hover:text-[#ff6523]/70 transition-all duration-300 group-hover:scale-110 drop-shadow-lg">
                      {product.origin.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Grade Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-black border backdrop-blur-sm ${
                      product.grade === 'A++' 
                        ? 'bg-[#ff6523] text-white border-[#ff6523] shadow-lg shadow-[#ff6523]/30' 
                        : product.grade === 'A+' 
                        ? 'bg-white/95 text-[#ff6523] border-[#ff6523]' 
                        : 'bg-white/90 text-black border-[#ff6523]/50'
                    }`}>
                      {product.grade === 'A++' && <Zap className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />}
                      {product.grade}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 border border-[#ff6523]/20 shadow-sm">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ff6523] fill-current" />
                    <span className="text-[10px] sm:text-xs text-black font-black">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 lg:p-5 relative z-10">
                  <div className="mb-2 sm:mb-3">
                    <h3 className="text-xs sm:text-sm lg:text-base font-black text-black mb-1 group-hover:text-[#ff6523] transition-colors duration-300 leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-black/70 font-bold leading-tight">
                      {product.origin}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-black/50 font-medium">
                      {product.crocin} Crocin
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <span className="text-lg sm:text-xl lg:text-2xl font-black text-[#ff6523] leading-none">${product.price}</span>
                      <div className="text-[9px] sm:text-[10px] text-black/60 font-bold">/ gram</div>
                    </div>
                    <button className="px-2 py-1.5 sm:px-3 sm:py-2 bg-[#ff6523] hover:bg-[#e55a1f] text-white text-[10px] sm:text-xs font-black rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6523]/40 active:scale-95 border border-[#ff6523] hover:border-[#e55a1f] whitespace-nowrap">
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-white text-xl mb-4 font-bold">No products found</div>
            <p className="text-white/80 mb-6 font-medium">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setPriceFilter('all');
                setOriginFilter('all');
                setGradeFilter('all');
              }}
              className="px-6 py-3 bg-white hover:bg-white/90 text-black font-bold rounded-xl transition-all duration-200 hover:shadow-lg border-2 border-white"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-white/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/80 font-medium">Premium saffron marketplace • Sourced globally, delivered fresh</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
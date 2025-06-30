import React, { useState } from 'react';
import { ArrowRight, Sparkles, Search, Star, Crown, Award } from 'lucide-react';

const Categories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const categories = [
    {
      id: 1,
      name: 'Royal Kashmiri',
      description: 'Hand-picked strands from Himalayan valleys',
      count: 12,
      featured: true,
      icon: Crown,
      price: 'From $299',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Persian Negin',
      description: 'The most potent Iranian saffron',
      count: 8,
      featured: false,
      icon: Star,
      price: 'From $249',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Spanish Coupe',
      description: 'Finest La Mancha saffron',
      count: 6,
      featured: true,
      icon: Award,
      price: 'From $199',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Organic Gold',
      description: 'Certified organic premium strands',
      count: 5,
      featured: false,
      icon: Sparkles,
      price: 'From $179',
      rating: 4.9
    },
    {
      id: 5,
      name: 'Imperial Gift Sets',
      description: 'Luxury packaged collections',
      count: 4,
      featured: true,
      icon: Crown,
      price: 'From $399',
      rating: 5.0
    },
    {
      id: 6,
      name: 'Signature Blends',
      description: 'Master blender specials',
      count: 7,
      featured: false,
      icon: Star,
      price: 'From $149',
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Ultra Premium Header */}
      <div className="sticky top-0 z-30 rounded-lg bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto rounded-lg px-8 py-6">
          <div className="flex justify-between rounded-lg items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6523] to-[#ff8c42] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="text-white h-5 w-5" />
              </div>
              <div className='rounded-lg'>
                <h1 className="text-2xl font-bold text-gray-900">Saffron Collections</h1>
                <p className="text-sm text-gray-500">Premium quality since 1847</p>
              </div>
            </div>
            
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                className="w-80 pl-12 pr-6 py-3 text-sm bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff6523]/20 focus:border-[#ff6523] shadow-sm transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl rounded-lg mx-auto px-8 py-16">
        <div className="text-center rounded-lg mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Our
            <span className="bg-gradient-to-r from-[#ff6523] to-[#ff8c42] bg-clip-text"> Premium </span>
            Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each strand carefully selected from the world's finest saffron regions, 
            bringing you unparalleled quality and flavor
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 rounded-lg md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className={`group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  category.featured 
                    ? 'ring-2 ring-[#ff6523]/20 shadow-[#ff6523]/10' 
                    : 'hover:ring-2 hover:ring-gray-200'
                } hover:scale-[1.02] cursor-pointer`}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Premium Badge */}
                {category.featured && (
                  <div className="absolute top-6 right-6 z-20">
                    <div className="bg-gradient-to-r from-[#ff6523] to-[#ff8c42] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Premium
                    </div>
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  hoveredCard === category.id 
                    ? 'bg-gradient-to-br from-[#ff6523]/5 to-[#ff8c42]/5' 
                    : 'bg-gradient-to-br from-gray-50/50 to-white'
                }`} />

                {/* Floating Orb Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#ff6523]/10 to-[#ff8c42]/10 rounded-full blur-3xl transition-all duration-700 ${
                  hoveredCard === category.id ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                }`} />

                <div className="relative z-10 p-8">
                  {/* Icon Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      category.featured 
                        ? 'bg-gradient-to-br from-[#ff6523] to-[#ff8c42] text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-[#ff6523] group-hover:text-white'
                    }`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{category.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.count} varieties</span>
                      <span className="text-lg font-bold text-[#ff6523]">{category.price}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    category.featured
                      ? 'bg-gradient-to-r from-[#ff6523] to-[#ff8c42] text-white shadow-lg hover:shadow-xl hover:from-[#ff5722] hover:to-[#ff7c3a]'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#ff6523] hover:text-white'
                  } group-hover:scale-[1.02]`}>
                    <span>Explore Collection</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium CTA Section */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-12 text-center shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ff6523/10,transparent_50%),radial-gradient(circle_at_70%_80%,#ff8c42/10,transparent_50%)]" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff6523] to-[#ff8c42] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Crown className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Exclusive Connoisseur Club
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Get first access to limited harvests, expert curation, and exclusive member pricing 
                on the world's finest saffron collections
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#ff6523] to-[#ff8c42] text-white font-semibold rounded-2xl hover:from-[#ff5722] hover:to-[#ff7c3a] transition-all shadow-lg hover:scale-105 hover:shadow-xl">
                  Become a Member
                </button>
                <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all border border-white/20">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
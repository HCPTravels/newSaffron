import React, { useRef } from 'react';
import { 
  Crown, 
  Flower, 
  Sparkles, 
  MapPin, 
  Clock, 
  Star, 
  Droplets,
  ShieldCheck,
  Award,
  Heart,
  Lightbulb,
  ChefHat,
  ArrowDown
} from 'lucide-react';

// Image imports (replace with your actual image paths)
import saffronField from '../assets/crocus.jpg';
import saffronCloseup from '../assets/stigma.jpg';
import saffronDishes from '../assets/bowl.jpg';
import saffronHarvest from '../assets/tea.jpg';
import saffronSpice from '../assets/saffronharvesting.jpg';
import saffronTips from '../assets/weighingh.png';
import thread from '../assets/thread.jpg'
import inused from '../assets/inused.jpg'

const SaffronComponent = () => {
  const sectionRefs = {
    overview: useRef(null),
    characteristics: useRef(null),
    culinary: useRef(null),
    cultivation: useRef(null),
    luxury: useRef(null),
    tips: useRef(null)
  };

  const scrollToNextSection = () => {
    const sections = Object.keys(sectionRefs);
    const nextSection = sections[0];
    sectionRefs[nextSection].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <img 
          src={saffronField} 
          alt="Saffron field with purple flowers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <Crown className="h-8 w-8 text-yellow-300" />
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              Saffron
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-300" />
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 drop-shadow-md">
            The World's Most Luxurious Spice
          </p>
          
          <button 
            onClick={scrollToNextSection}
            className="mt-4 animate-bounce flex flex-col items-center text-white hover:text-yellow-200 transition-colors"
          >
            <span className="text-sm mb-2">Discover</span>
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-20 relative z-10 space-y-32">
        {/* Overview Section */}
        <section 
          id="overview" 
          ref={sectionRefs.overview}
          className="grid md:grid-cols-2 gap-12 items-center mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
            <img 
              src={saffronCloseup} 
              alt="Closeup of saffron threads"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium">Introduction</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              The Red Gold of Spices
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Saffron, often referred to as "red gold," is the world's most precious spice. Each delicate thread is 
              hand-harvested from the Crocus sativus flower, with approximately 75,000 blossoms needed to produce 
              just one pound of saffron. This labor-intensive process contributes to its status as a symbol of luxury 
              and culinary excellence across cultures.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flower className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">Hand-harvested</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">Exquisite flavor</span>
              </div>
            </div>
          </div>
        </section>

        {/* Characteristics Section */}
        <section 
          id="characteristics" 
          ref={sectionRefs.characteristics}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-3 gap-2 h-96">
              {/* Color Panel */}
              <div className="relative rounded-l-2xl overflow-hidden">
                <img 
                  src={saffronCloseup} 
                  alt="Saffron threads macro view"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-medium">Color</span>
                </div>
              </div>
              
              {/* Aroma Panel */}
              <div className="relative">
                <img 
                  src={thread} 
                  alt="Saffron steeping in liquid"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-medium">Aroma</span>
                </div>
              </div>
              
              {/* Flavor Panel */}
              <div className="relative rounded-r-2xl overflow-hidden">
                <img 
                  src={inused} 
                  alt="Golden saffron rice dish"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-4">
                  <span className="text-white font-medium">Flavor</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium">Properties</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Unique Characteristics
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Vibrant Color</h3>
                  <p className="text-gray-600">
                    Saffron's intense golden hue comes from crocin, a natural carotenoid dye that infuses dishes with 
                    its signature color.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Distinct Aroma</h3>
                  <p className="text-gray-600">
                    The spice contains safranal, which gives it a complex, hay-like fragrance with floral notes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Potent Flavor</h3>
                  <p className="text-gray-600">
                    Just a few threads can transform a dish with its earthy, slightly bitter taste and honey-like sweetness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culinary Section */}
        <section 
          id="culinary" 
          ref={sectionRefs.culinary}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-12 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-orange-500"></div>
                <span className="text-orange-500 font-medium">Cuisine</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Culinary Masterpieces
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Saffron elevates both sweet and savory dishes across global cuisines. Its versatility makes it 
                indispensable in gourmet cooking, from Spanish paella to Persian tahdig and Indian biryanis.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <ChefHat className="h-6 w-6 text-orange-500 mb-2" />
                  <h4 className="font-bold text-gray-800">Savory Dishes</h4>
                  <p className="text-sm text-gray-600">Risotto, stews, sauces</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <Star className="h-6 w-6 text-orange-500 mb-2" />
                  <h4 className="font-bold text-gray-800">Desserts</h4>
                  <p className="text-sm text-gray-600">Ice cream, cakes, puddings</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <Droplets className="h-6 w-6 text-orange-500 mb-2" />
                  <h4 className="font-bold text-gray-800">Beverages</h4>
                  <p className="text-sm text-gray-600">Teas, lattes, cocktails</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-orange-500 mb-2" />
                  <h4 className="font-bold text-gray-800">Health Benefits</h4>
                  <p className="text-sm text-gray-600">Antioxidant properties</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
              <img 
                src={saffronDishes} 
                alt="Various dishes with saffron"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Cultivation Section */}
        <section 
          id="cultivation" 
          ref={sectionRefs.cultivation}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
            <img 
              src={saffronHarvest} 
              alt="Harvesting saffron flowers"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium">Production</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              The Art of Harvesting
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Global Origins</h3>
                  <p className="text-gray-600">
                    Iran produces 90% of the world's saffron, with significant cultivation in Spain, India, and Greece.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Seasonal Harvest</h3>
                  <p className="text-gray-600">
                    The crocus blooms for just 1-2 weeks in autumn, with flowers picked at dawn before they fully open.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Flower className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Labor Intensive</h3>
                  <p className="text-gray-600">
                    Each flower produces only 3 stigmas, requiring about 40 hours of labor to harvest 150,000 flowers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Section */}
        <section 
          id="luxury" 
          ref={sectionRefs.luxury}
          className="bg-gradient-to-br from-orange-900 to-amber-900 rounded-3xl p-12 shadow-xl text-white"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-orange-300"></div>
                <span className="text-orange-300 font-medium">Prestige</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                The Spice of Kings
              </h2>
              <p className="text-lg text-orange-100 mb-8 leading-relaxed">
                Saffron's rarity and exquisite qualities have made it a symbol of wealth and status throughout history. 
                Ancient rulers used it to perfume their baths, dye royal garments, and enhance their feasts.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Crown className="h-6 w-6 text-orange-300 mb-2" />
                  <h4 className="font-bold text-white">Historical Value</h4>
                  <p className="text-sm text-orange-100">Used since 3,500 years ago</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Award className="h-6 w-6 text-orange-300 mb-2" />
                  <h4 className="font-bold text-white">Price</h4>
                  <p className="text-sm text-orange-100">$5,000+ per kilogram</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <ShieldCheck className="h-6 w-6 text-orange-300 mb-2" />
                  <h4 className="font-bold text-white">Quality Grades</h4>
                  <p className="text-sm text-orange-100">Coupe, Superior, La Mancha</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Star className="h-6 w-6 text-orange-300 mb-2" />
                  <h4 className="font-bold text-white">Modern Status</h4>
                  <p className="text-sm text-orange-100">Michelin-star essential</p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <img 
                src={saffronTips}
                alt="Saffron threads being measured"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section 
          id="tips" 
          ref={sectionRefs.tips}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
            <img 
              src={saffronHarvest} 
              alt="Using saffron in cooking"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-orange-500"></div>
              <span className="text-orange-500 font-medium">Guide</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Using Saffron Like a Chef
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Activation</h3>
                  <p className="text-gray-600">
                    Crush threads and soak in warm liquid (water, milk, or stock) for 15-20 minutes to release full flavor.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Storage</h3>
                  <p className="text-gray-600">
                    Keep in an airtight container away from light and heat. Properly stored saffron lasts 2-3 years.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Dosage</h3>
                  <p className="text-gray-600">
                    A few threads (5-7) typically suffice for 4-6 servings. More doesn't always mean better flavor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-orange-900 to-amber-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Crown className="h-6 w-6 text-orange-300" />
            <Sparkles className="h-6 w-6 text-orange-300" />
            <Flower className="h-6 w-6 text-orange-300" />
          </div>
          <p className="text-lg text-orange-100 mb-4">
            The world's most precious spice
          </p>
          <p className="text-sm text-orange-200/80">
            © {new Date().getFullYear()} Saffron Guide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SaffronComponent;
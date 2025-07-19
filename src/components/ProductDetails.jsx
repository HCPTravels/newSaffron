import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast, Toaster } from "sonner";
import { Loader2, Zap, ChevronLeft, Star, Shield, Truck, Package, Check, Info, Share2, Minus, Plus, ShoppingCart } from "lucide-react";
import ProductReviews from "./ProductReviews.jsx";

const ProductDetails = ({ id, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/approved/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id, backendUrl, token]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu-container')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin w-8 h-8 text-orange-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  const getGradeBadge = (grade) => {
    const badges = {
      premium: {
        className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
        icon: <Zap className="w-3 h-3" />,
        text: "Premium",
      },
      category1: {
        className: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
        text: "Category I",
      },
      category2: {
        className: "bg-orange-400 text-white",
        text: "Category II",
      },
      category3: {
        className: "bg-orange-300 text-white",
        text: "Category III",
      },
      default: {
        className: "bg-gray-100 text-gray-700",
        text: "Standard",
      },
    };
    return badges[grade] || badges.default;
  };

  const gradeBadge = getGradeBadge(product.grade);
  const discountPercent = product.finalPrice < product.price ? 
    Math.round(((product.price - product.finalPrice) / product.price) * 100) : 0;

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(product._id, quantity);
      // The toast will be shown by the addToCart function in CartContext
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleShare = (platform) => {
    const productUrl = window.location.href;
    const productName = product.name;
    const productPrice = product.finalPrice;
    const message = `Check out this amazing ${productName} for ₹${productPrice}! ${productUrl}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(`Check out this amazing ${productName} for ₹${productPrice}!`)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(message);
        toast.success("Product link copied! You can now paste it in Instagram");
        setShowShareMenu(false);
        return;
      case 'copy':
        navigator.clipboard.writeText(message);
        toast.success("Product link copied to clipboard!");
        setShowShareMenu(false);
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster richColors closeButton position="top-center" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="relative share-menu-container">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            {/* Share Menu Dropdown */}
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 min-w-[200px]">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Share Product</p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W</span>
                    </div>
                    WhatsApp
                  </button>
                  
                  <button
                    onClick={() => handleShare('telegram')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    Telegram
                  </button>
                  
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    Facebook
                  </button>
                  
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">𝕏</span>
                    </div>
                    X (Twitter)
                  </button>
                  
                  <button
                    onClick={() => handleShare('instagram')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📷</span>
                    </div>
                    Instagram
                  </button>
                  
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📋</span>
                    </div>
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl text-orange-200 font-light">
                    {product.origin?.charAt(0) || "S"}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-orange-500 ring-offset-2"
                        : "hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${gradeBadge.className}`}>
                  {gradeBadge.icon}
                  {gradeBadge.text}
                </span>
                <span className="text-sm text-gray-500">From {product.origin}</span>
              </div>
              
              <h1 className="text-3xl font-light text-gray-900 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(4.8)</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-light text-gray-900">
                  ₹{product.finalPrice}
                </span>
                {product.finalPrice < product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {discountPercent}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Price per gram</p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">About this product</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Origin</p>
                  <p className="font-medium text-gray-900">{product.origin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Quality</p>
                  <p className="font-medium text-gray-900">{product.crocin} Grade</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-medium text-gray-900">{product.stock}g available</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Grade</p>
                  <p className="font-medium text-gray-900">{gradeBadge.text}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">grams</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full py-4 bg-[#ff6523] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart · ₹{(product.finalPrice * quantity)}
                  </>
                )}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 space-y-12">
          {/* Seller Info */}
          {product.seller && (
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Seller Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Business</p>
                    <p className="font-medium text-gray-900">{product.seller.businessName}</p>
                    <p className="text-sm text-gray-600">{product.seller.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Contact</p>
                    <p className="font-medium text-gray-900">{product.seller.contactNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Seller</p>
                    <p className="font-medium text-gray-900">
                      {product.seller.firstName} {product.seller.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{product.seller.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="border-t border-gray-100 pt-12">
            <h3 className="text-xl font-medium text-gray-900 mb-6">Customer Reviews</h3>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ProductReviews ProductId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
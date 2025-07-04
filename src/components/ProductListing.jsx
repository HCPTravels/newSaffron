import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Trash2, Loader2, Save, ChevronDown } from "lucide-react";
import { toast, Toaster } from "sonner";

const SaffronProductListing = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    grade: "",
    price: "",
    description: "",
    images: [],
    stock: "",
    origin: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setCurrentProduct(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    const newImages = [...currentProduct.images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    
    setCurrentProduct(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString()
      };
      
      setProducts([...products, newProduct]);
      
      toast.success("Product added!", {
        description: "Your saffron product has been successfully listed.",
        duration: 3000,
        position: "top-center",
        style: {
          background: "linear-gradient(135deg, #10b981, #059669)",
          border: "1px solid #065f46",
          color: "white",
        },
      });

      setCurrentProduct({
        name: "",
        grade: "",
        price: "",
        description: "",
        images: [],
        stock: "",
        origin: ""
      });
      setShowFullDescription(false);
    } catch (error) {
      toast.error("Failed to add product", {
        description: error.message || "Please check your information and try again.",
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

  const saffronGrades = [
    { value: "premium", label: "Premium (Sargol)" },
    { value: "category1", label: "Category I (Pushal)" },
    { value: "category2", label: "Category II" },
    { value: "category3", label: "Category III" },
    { value: "bunch", label: "Bunch (Dasteh)" }
  ];

  return (
    <div className="mt-20 p-4 md:p-6 min-h-screen bg-white">
      <Toaster richColors closeButton />
      
      <motion.div 
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] rounded-t-2xl">
          <h2 className="text-white text-2xl lg:text-3xl font-bold">List Your Saffron Products</h2>
          <p className="text-white/90 text-sm mt-1">
            Add your saffron products with different grades and pricing
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border border-gray-200">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Product Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleChange}
                        placeholder="e.g. Kashmiri Premium Saffron"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                        whileHover={{ scale: 1.01 }}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Saffron Grade
                      </label>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                      >
                        <select
                          id="grade"
                          name="grade"
                          value={currentProduct.grade}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200 appearance-none"
                          required
                        >
                          <option value="">Select saffron grade</option>
                          {saffronGrades.map((grade) => (
                            <option key={grade.value} value={grade.value}>
                              {grade.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <motion.textarea
                      id="description"
                      name="description"
                      value={currentProduct.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Describe your saffron (quality, aroma, uses, etc.)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                      whileHover={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Inventory</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (per gram)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">₹</span>
                        <motion.input
                          type="number"
                          id="price"
                          name="price"
                          value={currentProduct.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                          whileHover={{ scale: 1.01 }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                        Available Stock (grams)
                      </label>
                      <motion.input
                        type="number"
                        id="stock"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                        whileHover={{ scale: 1.01 }}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                        Origin
                      </label>
                      <motion.input
                        type="text"
                        id="origin"
                        name="origin"
                        value={currentProduct.origin}
                        onChange={handleChange}
                        placeholder="e.g. Kashmir, Spain"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe6522]/50 focus:border-transparent transition-all duration-200"
                        whileHover={{ scale: 1.01 }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {/* Image upload button */}
                    <motion.label 
                      htmlFor="product-images"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#fe6522] transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload images</p>
                      </div>
                      <input 
                        id="product-images" 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </motion.label>

                    {/* Preview uploaded images */}
                    {currentProduct.images.map((image, index) => (
                      <motion.div 
                        key={index}
                        className="relative h-32 rounded-xl overflow-hidden group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={image.preview} 
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                        <motion.button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={() => removeImage(index)}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Actions & Preview */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Publish Product</h3>
                  
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-lg transition-all duration-300 mb-4"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(254, 101, 34, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <>
                        <motion.span
                          animate={{ 
                            x: isHovered ? 2 : 0,
                            rotate: isHovered ? [0, -5, 5, 0] : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Save className="h-5 w-5" />
                        </motion.span>
                        <span>Save Product</span>
                      </>
                    )}
                  </motion.button>

                  {/* Enhanced Preview Section */}
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Frontend Preview</h4>
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                      {/* Image Display */}
                      <div className="h-48 relative bg-gradient-to-br from-amber-100 to-orange-100">
                        {currentProduct.images.length > 0 ? (
                          <img 
                            src={currentProduct.images[0].preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <ImagePlus className="h-12 w-12" />
                            <span className="sr-only">No image uploaded</span>
                          </div>
                        )}
                        
                        {/* Grade Badge */}
                        {currentProduct.grade && (
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              currentProduct.grade === 'premium' 
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                                : currentProduct.grade === 'category1' 
                                ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`}>
                              {currentProduct.grade === 'premium' && 'Premium'}
                              {currentProduct.grade === 'category1' && 'Category I'}
                              {currentProduct.grade === 'category2' && 'Category II'}
                              {currentProduct.grade === 'category3' && 'Category III'}
                              {currentProduct.grade === 'bunch' && 'Bunch'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {currentProduct.name || "Your Saffron Product"}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">
                            {currentProduct.origin || "Origin"}
                          </span>
                          {currentProduct.stock && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {currentProduct.stock}g in stock
                            </span>
                          )}
                        </div>

                        {/* Description with Show More */}
                        {currentProduct.description && (
                          <div className="mb-3">
                            <p className={`text-sm text-gray-600 ${showFullDescription ? '' : 'line-clamp-2'}`}>
                              {currentProduct.description}
                            </p>
                            {currentProduct.description.length > 100 && (
                              <button 
                                onClick={toggleDescription}
                                className="text-sm font-medium text-[#fe6522] hover:text-[#e55a1d] mt-1 flex items-center"
                              >
                                {showFullDescription ? 'Show less' : 'Show more'}
                                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                              </button>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-3">
                          {currentProduct.price ? (
                            <div>
                              <span className="text-xl font-bold text-[#fe6522]">
                                ₹{parseFloat(currentProduct.price).toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">per gram</span>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">Price not set</div>
                          )}
                          
                          <button 
                            className="px-3 py-2 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all"
                            type="button"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Listed Products Section */}
        {products.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Listed Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div 
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.images.length > 0 ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.images[0].preview} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{product.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        product.grade === 'premium' 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                          : product.grade === 'category1' 
                          ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {product.grade === 'premium' && 'Premium'}
                        {product.grade === 'category1' && 'Category I'}
                        {product.grade === 'category2' && 'Category II'}
                        {product.grade === 'category3' && 'Category III'}
                        {product.grade === 'bunch' && 'Bunch'}
                      </span>
                    </div>
                    
                    <p className="text-lg font-bold text-[#fe6522] mt-2">
                      ₹{parseFloat(product.price).toFixed(2)}/g
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                      <span>Stock: {product.stock}g</span>
                      <span>{product.origin}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SaffronProductListing;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Trash2, Loader2, Save, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const SaffronProductListing = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      const formData = new FormData();
      formData.append("name", currentProduct.name);
      formData.append("grade", currentProduct.grade);
      formData.append("price", currentProduct.price);
      formData.append("description", currentProduct.description);
      formData.append("stock", currentProduct.stock);
      formData.append("origin", currentProduct.origin);
  
      currentProduct.images.forEach((imgObj) => {
        formData.append("images", imgObj.file);
      });
  
      const res = await axios.post(`${backendUrl}/api/product/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const newProduct = {
        ...res.data,
        images: res.data.images || currentProduct.images,
      };
  
      setProducts([...products, newProduct]);
      toast.success("Product listed successfully!");
  
      setCurrentProduct({
        name: "",
        grade: "",
        price: "",
        description: "",
        images: [],
        stock: "",
        origin: "",
      });
      setShowFullDescription(false);
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to list product", {
        description: error?.response?.data?.message || error.message,
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
    <div className="min-h-screen bg-gray-50">
      
      {/* Modern Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#ff6523] to-[#e55a1d] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                  <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
                  <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SaffronHub</h1>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              New Product
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#fff7f2] to-[#ffefe5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">List Your Premium Saffron</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Showcase your saffron products with beautiful listings that highlight quality and authenticity
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Form section */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Form inputs */}
              <div className="lg:col-span-2 space-y-6">
                {/* Product Information Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-6 bg-[#ff6523] rounded-full mr-3"></span>
                    Product Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleChange}
                        placeholder="Kashmiri Premium Saffron"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                        Saffron Grade*
                      </label>
                      <div className="relative">
                        <select
                          id="grade"
                          name="grade"
                          value={currentProduct.grade}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50 appearance-none"
                          required
                        >
                          <option value="">Select grade</option>
                          {saffronGrades.map((grade) => (
                            <option key={grade.value} value={grade.value}>
                              {grade.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={currentProduct.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the quality, aroma, and uses of your saffron..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Pricing & Inventory Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-6 bg-[#ff6523] rounded-full mr-3"></span>
                    Pricing & Inventory
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹/gram)*
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={currentProduct.price}
                          onChange={handleChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                        Stock (grams)*
                      </label>
                      <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                        Origin*
                      </label>
                      <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={currentProduct.origin}
                        onChange={handleChange}
                        placeholder="Kashmir, Spain, etc."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff6523]/30 focus:border-[#ff6523]/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload Card */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-6 bg-[#ff6523] rounded-full mr-3"></span>
                    Product Images
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <motion.label 
                      htmlFor="product-images"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#ff6523] transition-colors bg-gray-50"
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

                    {currentProduct.images.map((image, index) => (
                      <motion.div 
                        key={index}
                        className="relative h-32 rounded-xl overflow-hidden group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <img 
                            src={image.preview} 
                            alt={`Preview ${index}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <motion.button
                          type="button"
                          className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
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

              {/* Right column - Preview & Submit */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Preview Card */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-800 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-[#ff6523]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        Live Preview
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-gray-200">
                        {/* Image */}
                        <div className="h-48 relative bg-gray-100 flex items-center justify-center">
                          {currentProduct.images.length > 0 ? (
                            <img 
                              src={currentProduct.images[0].preview} 
                              alt="Preview" 
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                              <ImagePlus className="h-12 w-12" />
                            </div>
                          )}
                          
                          {/* Grade badge */}
                          {currentProduct.grade && (
                            <div className="absolute top-3 right-3">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                currentProduct.grade === 'premium' 
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                                  : 'bg-gray-100 text-gray-800'
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

                        {/* Product info */}
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

                          {/* Description */}
                          {currentProduct.description && (
                            <div className="mb-3">
                              <p className={`text-sm text-gray-600 ${showFullDescription ? '' : 'line-clamp-2'}`}>
                                {currentProduct.description}
                              </p>
                              {currentProduct.description.length > 100 && (
                                <button 
                                  onClick={toggleDescription}
                                  className="text-sm font-medium text-[#ff6523] hover:text-[#e55a1d] mt-1 flex items-center"
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
                                <span className="text-xl font-bold text-[#ff6523]">
                                  ₹{parseFloat(currentProduct.price).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-500 ml-1">per gram</span>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-400">Price not set</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Card */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-800">Publish Product</h3>
                    </div>
                    <div className="p-4">
                      <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white font-medium shadow-sm hover:shadow-md transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5" />
                            <span>Publish Product</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Listed Products Section */}
        {products.length > 0 && (
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Listed Products</h2>
              <span className="text-sm bg-[#ff6523]/10 text-[#ff6523] px-3 py-1 rounded-full">
                {products.length} {products.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-all border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Product image */}
                  <div className="h-48 relative bg-gray-100 flex items-center justify-center">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={typeof product.images[0] === 'string' ? product.images[0] : product.images[0].preview} 
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <ImagePlus className="h-12 w-12" />
                      </div>
                    )}
                  </div>

                  {/* Product details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.grade === 'premium' 
                          ? 'bg-[#ff6523]/10 text-[#ff6523]' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.grade || 'Standard'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{product.origin}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.stock}g
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#ff6523]">
                        ₹{parseFloat(product.price).toFixed(2)}
                      </span>
                      <button className="text-xs text-[#ff6523] hover:text-[#e55a1d] font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SaffronProductListing;
import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, LogOut, Check, X, Plus, Filter, Search, MoreVertical, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminProductPanel = () => {
  const { logout, token } = useAuth()
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage or your auth context
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        
        const response = await fetch(`${backendUrl}/api/product/get/pending`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please login again');
          }
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (err.message.includes('Unauthorized')) {
          setError('Session expired. Please login again.');
          toast.error('Session expired. Please login again.', {
            position: "top-center",
            duration: 3000,
          });
          // Optional: Auto logout after a delay
          setTimeout(() => {
            logout();
          }, 3000);
        } else {
          setError('Failed to fetch products. Please try again.');
          toast.error('Failed to fetch products', {
            position: "top-center",
            duration: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [logout]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully", {
      position: "top-center",
      duration: 2000,
    });
  };

  const handleApprove = async (productId) => {
    try {
      // Use the token from the component's useAuth() call at the top
      // Remove the useAuth() call from here
      if (!token) {
        toast.error("Authentication token not found. Please login again.", {
          position: "top-center",
          duration: 3000,
        });
        logout();
        return;
      }
  
      const response = await axios.patch(
        `${backendUrl}/api/product/approve/${productId}`,
        {}, // Empty body
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update local state to reflect the change
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === productId 
            ? { ...product, status: 'approved' }
            : product
        )
      );
  
      toast.success("Product approved successfully", {
        description: `Product has been approved and is now live.`,
        position: "top-center",
        duration: 3000,
      });
  
    } catch (err) {
      console.error('Error approving product:', err);
      
      // Handle different error scenarios
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.", {
          position: "top-center",
          duration: 3000,
        });
        setTimeout(() => {
          logout();
        }, 3000);
      } else if (err.response?.status === 403) {
        toast.error("You don't have permission to approve products.", {
          position: "top-center",
          duration: 3000,
        });
      } else if (err.response?.status === 404) {
        toast.error("Product not found.", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.error("Failed to approve product. Please try again.", {
          position: "top-center",
          duration: 3000,
        });
      }
    }
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setIsRejectModalOpen(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    toast.success("Product rejected", {
      description: `Product "${selectedProduct.name}" has been rejected.`,
      position: "top-center",
      duration: 3000,
    });

    setIsRejectModalOpen(false);
    setSelectedProduct(null);
    setRejectReason('');
  };

  const closeModal = () => {
    setIsRejectModalOpen(false);
    setSelectedProduct(null);
    setRejectReason('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            Approved
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Rejected
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
            Pending
          </div>
        );
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: products.length,
      pending: products.filter(p => p.status === 'pending').length,
      approved: products.filter(p => p.status === 'approved').length,
      rejected: products.filter(p => p.status === 'rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#ff6523] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-[#ff6523] text-white rounded-xl hover:bg-[#e55a1d] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster richColors closeButton />
      
      {/* Modern Header with Glassmorphism */}
      <div className="relative mt-25">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6523] to-[#e55a1d]"></div>
        <div className="relative backdrop-blur-sm bg-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-white/80 text-sm">Manage and verify product listings</p>
                </div>
              </div>
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: statusCounts.total, color: 'bg-white', textColor: 'text-gray-800' },
            { label: 'Pending', value: statusCounts.pending, color: 'bg-gradient-to-r from-amber-400 to-amber-500', textColor: 'text-white' },
            { label: 'Approved', value: statusCounts.approved, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500', textColor: 'text-white' },
            { label: 'Rejected', value: statusCounts.rejected, color: 'bg-gradient-to-r from-red-400 to-red-500', textColor: 'text-white' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.color} rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${stat.textColor} opacity-80`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent transition-all duration-300 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent transition-all duration-300"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <motion.button 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add Product
            </motion.button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product._id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Product Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
                  </div>
                  
                  {/* Large Origin Letter */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl font-black text-amber-400/20 group-hover:text-amber-400/30 transition-all duration-300">
                      {product.origin.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Grade Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      product.grade === 'premium' 
                        ? 'bg-gradient-to-r from-amber-500 to-[#ff6523] text-white' 
                        : 'bg-gradient-to-r from-[#ff6523] to-orange-500 text-white'
                    }`}>
                      {product.grade === 'premium' && <Zap className="w-3 h-3 mr-1" />}
                      {product.grade === 'premium' ? 'Premium' : 'Category I'}
                    </div>
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-800 font-semibold">{product.stock} in stock</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(product.status)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff6523] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 font-medium px-3 py-1 bg-gray-50 rounded-full">
                        {product.origin}
                      </span>
                      <span className="text-sm bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white px-3 py-1 rounded-full font-semibold">
                        ₹{product.price}/gram
                      </span>
                    </div>
                  </div>
                  
                  {/* Seller Information */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Seller</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff6523] to-[#e55a1d] flex items-center justify-center text-white font-bold">
                        {product.seller.firstName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.seller.firstName} {product.seller.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{product.seller.email}</p>
                        <p className="text-xs text-gray-500">{product.seller.businessName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="flex gap-3">
                    {product.status === 'pending' ? (
                      <>
                        <motion.button 
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          onClick={() => handleApprove(product._id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </motion.button>
                        <motion.button 
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          onClick={() => handleReject(product)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </motion.button>
                      </>
                    ) : (
                      <div className="flex-1 text-center text-sm text-gray-500 py-3 bg-gray-50 rounded-xl font-medium">
                        {product.status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Reject Modal with Blur */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          <motion.div
            className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Reject Product</h3>
                <p className="text-sm text-gray-600">{selectedProduct?.name}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Reason for rejection *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff6523] focus:border-transparent resize-none transition-all duration-300 bg-gray-50"
                rows="4"
                placeholder="Please provide a detailed reason for rejecting this product..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                onClick={closeModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                onClick={confirmReject}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reject Product
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPanel;
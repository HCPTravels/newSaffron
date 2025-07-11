import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, LogOut, Check, X, Filter, Search, MoreVertical, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminProductPanel = () => {
  const { logout, token } = useAuth();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
  }, [logout, backendUrl]);

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-center",
      duration: 2000,
    });
    setTimeout(() => logout(), 500);
  };

  const handleApprove = async (productId) => {
    try {
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
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
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

  const confirmReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${backendUrl}/api/product/reject/${selectedProduct._id}`,
        { rejectionReason: rejectReason },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === selectedProduct._id 
            ? { ...product, status: 'rejected', rejectionReason: rejectReason }
            : product
        )
      );

      toast.success("Product rejected", {
        description: `Product "${selectedProduct.name}" has been rejected.`,
        position: "top-center",
        duration: 3000,
      });
    } catch (err) {
      console.error('Error rejecting product:', err);
      toast.error("Failed to reject product. Please try again.", {
        position: "top-center",
        duration: 3000,
      });
    }

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
      
      {/* Floating Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ff6523] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Product Moderation</h1>
          </div>
          
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff6523]/10 text-[#ff6523] rounded-lg hover:bg-[#ff6523]/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: 'Total Products', value: statusCounts.total, bg: 'bg-white', border: 'border-gray-200' },
            { label: 'Pending Review', value: statusCounts.pending, bg: 'bg-amber-50', border: 'border-amber-100' },
            { label: 'Approved', value: statusCounts.approved, bg: 'bg-emerald-50', border: 'border-emerald-100' },
            { label: 'Rejected', value: statusCounts.rejected, bg: 'bg-red-50', border: 'border-red-100' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bg} border ${stat.border} rounded-xl p-5 shadow-xs hover:shadow-sm transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <div className={`h-1 mt-2 rounded-full ${index === 0 ? 'bg-gray-200' : index === 1 ? 'bg-amber-400' : index === 2 ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
            </motion.div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent transition-all w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent transition-all w-full md:w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500">No products found</h3>
              <p className="text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product._id} 
                  className="group bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#ff6523]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {/* Product Image/Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl font-black text-gray-200 group-hover:text-gray-300 transition-all duration-300">
                        {product.origin.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {getStatusBadge(product.status)}
                    </div>
                    
                    {/* Grade Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        product.grade === 'premium' 
                          ? 'bg-[#ff6523] text-white' 
                          : 'bg-gray-800 text-white'
                      }`}>
                        {product.grade === 'premium' && <Star className="w-3 h-3 mr-1 fill-white" />}
                        {product.grade === 'premium' ? 'Premium' : 'Standard'}
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                      <span className="text-sm bg-[#ff6523]/10 text-[#ff6523] px-2 py-1 rounded font-medium">
                        ₹{product.price}/g
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {product.origin}
                      </span>
                      <span className="text-xs text-gray-500">
                        Stock: <span className="font-medium">{product.stock}</span>
                      </span>
                    </div>
                    
                    {/* Seller Info */}
                    <div className="mb-5 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">SUBMITTED BY</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff6523]/10 text-[#ff6523] flex items-center justify-center font-medium">
                          {product.seller.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {product.seller.firstName} {product.seller.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[160px]">{product.seller.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {product.status === 'pending' ? (
                        <>
                          <motion.button 
                            className="flex-1 px-3 py-2 bg-[#ff6523] text-white text-sm font-medium rounded-lg hover:bg-[#e55a1d] transition-colors flex items-center justify-center gap-1"
                            onClick={() => handleApprove(product._id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </motion.button>
                          <motion.button 
                            className="flex-1 px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
                            onClick={() => handleReject(product)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </motion.button>
                        </>
                      ) : (
                        <div className={`flex-1 text-center text-sm py-2 rounded-lg font-medium ${
                          product.status === 'approved' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {product.status === 'approved' ? 'Approved' : 'Rejected'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            ></motion.div>
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 z-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Reject Product</h3>
                  <p className="text-gray-600 text-sm">{selectedProduct?.name}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for rejection <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6523]/50 focus:border-transparent resize-none transition-all bg-gray-50"
                  rows="4"
                  placeholder="Explain why this product is being rejected..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <motion.button
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  onClick={closeModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-1"
                  onClick={confirmReject}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-4 h-4" />
                  Confirm Reject
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductPanel;
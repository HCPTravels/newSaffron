import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Edit,
  List,
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Menu,
  X as CloseIcon
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '../context/AuthContext';
import axios from "axios";

const SellerDashboard = () => {
  const { seller, deleteProduct, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${backendUrl}/api/product/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        if (res.data.success) {
          setProducts(res.data.products);
          toast.success("Products loaded successfully");
        } else {
          toast.error("Failed to load products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [backendUrl]);

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const result = await deleteProduct(productId);
      if (result && result.success) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Product deletion failed:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 shadow-sm">
        {/* Logo/Brand section */}
        <div className="flex items-center justify-center h-20 px-4 bg-gradient-to-r from-[#ff6523] to-[#e55a1d]">
          <motion.h1 
            className="text-white font-bold text-2xl tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Saffron<span className="font-light">Seller</span>
          </motion.h1>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto">
          <nav className="flex-1 space-y-1">
            {/* Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/seller/dashboard"
                className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-all duration-200 group"
              >
                <Home className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
                <span className="ml-3 font-medium">Dashboard</span>
              </Link>
            </motion.div>

            {/* Products dropdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <button
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
                  <span className="ml-3 font-medium">Products</span>
                </div>
                {isProductsDropdownOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
                )}
              </button>

              <AnimatePresence>
                {isProductsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 mt-1 space-y-1">
                      <Link
                        to="/productlisting"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        <span>Add Product</span>
                      </Link>
                      <Link
                        to="/seller/products"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                      >
                        <List className="h-4 w-4 mr-2" />
                        <span>View All</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other Navigation Items */}
            {[
              { icon: ShoppingCart, text: "Orders", to: "/seller/orders", delay: 0.2 },
              { icon: Users, text: "Customers", to: "/seller/customers", delay: 0.25 },
              { icon: Settings, text: "Settings", to: "/seller/settings", delay: 0.3 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay }}
              >
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200 group"
                >
                  <item.icon className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
                  <span className="ml-3 font-medium">{item.text}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <motion.div
          className="flex-shrink-0 p-4 border-t border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200 group"
          >
            <LogOut className="h-5 w-5 text-gray-500 group-hover:text-[#ff6523]" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </motion.div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div className="flex items-center justify-between h-20 px-4 bg-gradient-to-r from-[#ff6523] to-[#e55a1d]">
                <h1 className="text-white font-bold text-xl">SaffronSeller</h1>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex flex-col flex-1 px-4 py-4 overflow-y-auto">
                <nav className="flex-1 space-y-2">
                  <Link
                    to="/seller/dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span className="ml-3">Dashboard</span>
                  </Link>

                  <div>
                    <button
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <Package className="h-5 w-5" />
                        <span className="ml-3">Products</span>
                      </div>
                      {isProductsDropdownOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>

                    {isProductsDropdownOpen && (
                      <div className="pl-12 mt-1 space-y-1">
                        <Link
                          to="/productlisting"
                          className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          <span>Add Product</span>
                        </Link>
                        <Link
                          to="/seller/products"
                          className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <List className="h-4 w-4 mr-2" />
                          <span>View All</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/seller/orders"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="ml-3">Orders</span>
                  </Link>

                  <Link
                    to="/seller/customers"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Users className="h-5 w-5" />
                    <span className="ml-3">Customers</span>
                  </Link>

                  <Link
                    to="/seller/settings"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="ml-3">Settings</span>
                  </Link>
                </nav>
              </div>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-gray-700 rounded-xl hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-500 hover:text-[#ff6523] p-1 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">Dashboard Overview</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6523] to-[#e55a1d] flex items-center justify-center text-white font-medium">
                  {seller?.firstName?.charAt(0) || "S"}
                </div>
                <span className="hidden md:inline-block font-medium text-gray-700">
                  {seller?.firstName || "Seller"}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/seller/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/seller/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#ff6523]/10 hover:text-[#ff6523] transition-colors"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {[
                { icon: Package, label: "Total Products", value: products.length, color: "bg-[#ff6523]/10", textColor: "text-[#ff6523]" },
                { icon: ShoppingCart, label: "Total Orders", value: "24", color: "bg-emerald-100", textColor: "text-emerald-600" },
                { icon: Users, label: "Total Customers", value: "18", color: "bg-blue-100", textColor: "text-blue-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color} ${stat.textColor}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                      <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Products Section */}
            <motion.div
              className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Your Products</h2>
                <Link
                  to="/productlisting"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-[#ff6523] to-[#e55a1d] text-white rounded-lg shadow-xs hover:shadow-sm transition-all"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Product
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {isLoading ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center">
                          <div className="flex justify-center">
                            <div className="w-10 h-10 border-4 border-[#ff6523] border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <p className="mt-2 text-gray-500">Loading products...</p>
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center">
                          <Package className="h-10 w-10 text-gray-300 mx-auto" />
                          <p className="mt-2 text-gray-500">No products found</p>
                          <Link
                            to="/productlisting"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-[#ff6523] text-white rounded-lg hover:bg-[#e55a1d] transition-colors"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Your First Product
                          </Link>
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden bg-gray-100">
                                {product.image ? (
                                  <img className="h-full w-full object-cover" src={product.image} alt={product.name} />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <Package className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">{product.origin}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ₹{typeof product.price === "number" ? product.price.toFixed(2) : Number(product.price || 0).toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              product.stock > 0 ? 'text-gray-900' : 'text-red-500'
                            }`}>
                              {product.stock > 0 ? product.stock : 'Out of stock'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                              product.grade === 'premium' 
                                ? 'bg-[#ff6523]/10 text-[#ff6523]' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.grade || 'Standard'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                              product.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : product.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : product.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {product.status || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-3">
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                              <Link
                                to={`/seller/edit-product/${product._id}`}
                                className="text-[#ff6523] hover:text-[#e55a1d] transition-colors p-1.5 rounded-lg hover:bg-[#ff6523]/10"
                                title="Edit"
                              >
                                <Edit className="h-5 w-5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
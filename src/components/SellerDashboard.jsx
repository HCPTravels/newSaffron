import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Trash2, 
  List, 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useAuth } from '../context/AuthContext'; // Adjust the import based on your context file structure

const SellerDashboard = () => {
  const {seller} = useAuth() 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const mockProducts = [
          {
            id: 1,
            name: "Premium Kashmiri Saffron",
            price: 20.99,
            stock: 15,
            image: "https://via.placeholder.com/100",
            status: "Active"
          },
          {
            id: 2,
            name: "Organic Persian Saffron",
            price: 18.50,
            stock: 8,
            image: "https://via.placeholder.com/100",
            status: "Active"
          },
          {
            id: 3,
            name: "Spanish Saffron Threads",
            price: 15.75,
            stock: 0,
            image: "https://via.placeholder.com/100",
            status: "Out of Stock"
          }
        ];
        setProducts(mockProducts);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = (productId) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Product deleted successfully");
    }
  };

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-screen mt-30 bg-gray-50">
      <Toaster 
        richColors 
        closeButton 
        toastOptions={{
          style: {
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(8px)',
          },
        }}
      />
      
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
            <h1 className="text-white font-bold text-xl">Saffron Seller</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              <Link
                to="/seller/dashboard"
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                <Home className="h-5 w-5" />
                <span className="ml-3">Dashboard</span>
              </Link>
              
              <div>
                <button
                  onClick={toggleProductsDropdown}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
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
                      className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span className="ml-2">Add Product</span>
                    </Link>
                    <Link
                      to="/seller/products"
                      className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                    >
                      <List className="h-4 w-4" />
                      <span className="ml-2">View All</span>
                    </Link>
                  </div>
                )}
              </div>
              
              <Link
                to="/seller/orders"
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-3">Orders</span>
              </Link>
              
              <Link
                to="/seller/customers"
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                <Users className="h-5 w-5" />
                <span className="ml-3">Customers</span>
              </Link>
              
              <Link
                to="/seller/settings"
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                <Settings className="h-5 w-5" />
                <span className="ml-3">Settings</span>
              </Link>
            </nav>
            
            <div className="mt-auto pb-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-full max-w-xs bg-white">
            <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-[#fe6522] to-[#e55a1d]">
              <h1 className="text-white font-bold text-xl">Saffron Seller</h1>
            </div>
            <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
              <nav className="flex-1 space-y-2">
                <Link
                  to="/seller/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span className="ml-3">Dashboard</span>
                </Link>
                
                <div>
                  <button
                    onClick={toggleProductsDropdown}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
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
                        to="/seller/add-product"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="ml-2">Add Product</span>
                      </Link>
                      <Link
                        to="/seller/products"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <List className="h-4 w-4" />
                        <span className="ml-2">View All</span>
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link
                  to="/seller/orders"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="ml-3">Orders</span>
                </Link>
                
                <Link
                  to="/seller/customers"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="h-5 w-5" />
                  <span className="ml-3">Customers</span>
                </Link>
                
                <Link
                  to="/seller/settings"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                  <span className="ml-3">Settings</span>
                </Link>
              </nav>
              
              <div className="mt-auto pb-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              className="md:hidden text-gray-500 hover:text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="ml-4 text-xl font-semibold text-gray-800">Seller Dashboard</h1>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User profile"
                />
                <span className="hidden md:inline">{seller.firstName}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/seller/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/seller/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                    <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="text-2xl font-semibold text-gray-900">24</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                    <p className="text-2xl font-semibold text-gray-900">18</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Products section */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Your Products</h2>
                  <Link
                    to="/productlisting"
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-[#fe6522] to-[#e55a1d] text-white rounded-md shadow-sm hover:shadow-md transition-all"
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    Add Product
                  </Link>
                </div>
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
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center">
                          <div className="flex justify-center items-center">
                            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No products found. Add your first product!
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded" src={product.image} alt={product.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.stock}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900 mr-4"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <Link
                              to={`/seller/edit-product/${product.id}`}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
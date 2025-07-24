import React from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import LoginSuccess from "./pages/LoginSuccess";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AllProducts from "./components/Allproduct";
import Contact from "./components/Contact";
import LoginPage from "./pages/Login";
import Signup from "./pages/SignupPage";
import Blog from "./components/Blog";
import About from "./pages/About";
import ContactUs from "./pages/Contactus";
import OurPartners from "./pages/OurPartners";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Homepage";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Account from "./components/Account";
// import OtpVerificationPage from './pages/OtpverifyPage';
import SignupForm from "./pages/SignupForm";
import SellerSignupPage from "./pages/SellerSignupPage";
import SaffronProductListing from "./components/ProductListing";
import SellerDashboard from "./components/SellerDashboard";
import SellerLogin from "./pages/SellerLogin";
import AdminProductPanel from "./components/Adminpannel";
import AdminRoute from "./components/AdminRoute";
import SaffronPackaging from "./components/SaffronPackaging";
import SaffronComponent from "./components/SaffronLuxury";
import SaffronQuality from "./components/SaffronComponent";
import SellerProtectedRoute from "./components/SellerProtected";
import { ProductProvider } from "./context/ProductContext";
import Wishlist from "./components/Wishlisht";
import { WishlistProvider } from "./context/WishlistContext";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";
import Coupons from "./components/Coupons";
import HelpCenter from "./components/HelpCenter";
import Reviews from "./components/Reviews";
import Settings from "./components/Settings";
import Order from "./pages/Order";
import Address from "./pages/Address";
import UserAddresses from "./pages/UserAddresses";
import SelectAddress from "./pages/SelectAddress";
import ProductDetailsWrapper from "./components/ProductDetailsWrapper";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastPosition, setToastPosition] = useState("top-right");

  useEffect(() => {
    const checkPosition = () => {
      if (window.innerWidth < 640) {
        setToastPosition("top-center");
      } else {
        setToastPosition("top-right");
      }
    };
    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => window.removeEventListener("resize", checkPosition);
  }, []);

  const hideNavbarRoutes = [
    "/dashboard",
    "/adminpanel",
    "/sellerdashboard",
    "/productlisting",
  ];
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <AuthProvider>
      <Toaster richColors closeButton position={toastPosition} />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <AllProducts />
              <Contact />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        {/* <Route path="/otpverify" element={<OtpVerificationPage />} /> */}
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/partners" element={<OurPartners />} />
        <Route path="/sellersignup" element={<SellerSignupPage />} />
        <Route path="/saffronpackaging" element={<SaffronPackaging />} />
        <Route path="/precioussaffron" element={<SaffronComponent />} />
        <Route path="/naturalsaffron" element={<SaffronQuality />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/ourpartners" element={<OurPartners />} />
        <Route
          path="/sellerdashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboard />
            </SellerProtectedRoute>
          }
        />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route
          path="/productlisting"
          element={<SaffronProductListing />}
        />
        <Route
          path="/adminpanel"
          element={
            <AdminRoute>
              <AdminProductPanel />
            </AdminRoute>
          }
        />

        {/* Protected Dashboard Routes - All require authentication */}
        <Route
          path="/dashboard"
          element={
            <CartProvider>
              <ProductProvider>
                <WishlistProvider>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </WishlistProvider>
              </ProductProvider>
            </CartProvider>
          }
        >
          {/* Nested routes within Dashboard */}
          <Route index element={<Home onSelectProduct={(id) => {
            console.log("Navigating to product:", id);
            navigate(`/dashboard/product/${id}`);
          }} />} />
          <Route path="categories" element={<Categories />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Order />} />
          <Route path="account" element={<Account isVisible={true} />} />
          <Route path="useraddresses" element={<UserAddresses />} />
          <Route path="address" element={<Address />} />
          <Route path="selectaddress" element={<SelectAddress />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="product/:id" element={<ProductDetailsWrapper />} />
        </Route>

        {/* Redirect standalone routes to dashboard routes */}
        <Route path="/homepage" element={<Navigate to="/dashboard" replace />} />
        <Route path="/categories" element={<Navigate to="/dashboard/categories" replace />} />
        <Route path="/cart" element={<Navigate to="/dashboard/cart" replace />} />
        <Route path="/wishlist" element={<Navigate to="/dashboard/wishlist" replace />} />
        <Route path="/orders" element={<Navigate to="/dashboard/orders" replace />} />
        <Route path="/account" element={<Navigate to="/dashboard/account" replace />} />
        <Route path="/coupons" element={<Navigate to="/dashboard/coupons" replace />} />
        <Route path="/help-center" element={<Navigate to="/dashboard/help-center" replace />} />
        <Route path="/reviews" element={<Navigate to="/dashboard/reviews" replace />} />
        <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

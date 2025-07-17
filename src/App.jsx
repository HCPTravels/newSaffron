import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import Wishlist from "./components/Wishlisht";
import { WishlistProvider } from './context/WishlistContext'; // ✅ named import
import ResetPassword from "./pages/ResetPassword";
import { ProductProvider } from "./context/ProductContext";


function App() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/profile",
    "/adminpanel",
    "/sellerdashboard",
    "/productlisting"
  ];
  const hideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <WishlistProvider>
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/sellerdashboard"
              element={
                <SellerProtectedRoute>
                  <SellerDashboard />
                </SellerProtectedRoute>
              }
            />
            <Route path="/sellerlogin" element={<SellerLogin />} />
            <Route path="/productlisting" element={<SaffronProductListing />} />
            <Route
              path="/adminpanel"
              element={
                <AdminRoute>
                  <AdminProductPanel />
                </AdminRoute>
              }
            />

            {/* Profile routes with nested structure */}
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Standalone routes (these will show main navbar) */}
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={<Navigate to="/profile/cart" replace />}
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
          </Routes>
          </WishlistProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
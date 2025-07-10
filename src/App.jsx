import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AllProducts from './components/Allproduct';
import Contact from './components/Contact';
import LoginPage from './pages/Login';
import Signup from './pages/SignupPage';
import Blog from './components/Blog';
import About from './pages/About';
import ContactUs from './pages/Contactus';
import OurPartners from './pages/OurPartners';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Homepage';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Account from './components/Account';
import OtpVerificationPage from './pages/OtpverifyPage';
import SignupForm from './pages/SignupForm';
import SellerSignupPage from './pages/SellerSignupPage';
import SaffronProductListing from './components/ProductListing';
import SellerDashboard from './components/SellerDashboard';
import SellerLogin from './pages/SellerLogin';
import AdminProductPanel from './components/Adminpannel';
import AdminRoute from "./components/AdminRoute"
import SaffronPackaging from './components/SaffronPackaging';
import SaffronComponent from './components/SaffronLuxury';
import SaffronQuality from './components/SaffronComponent';
import SellerProtectedRoute from './components/SellerProtected'


function App() {
  const location = useLocation();

  const hideNavbarRoutes = ['/profile', '/adminpanel', '/sellerdashboard'];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
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
        <Route path="/otpverify" element={<OtpVerificationPage />} />
        <Route path="/signupform" element={<SignupForm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/partners" element={<OurPartners />} />
        <Route path="/sellersignup" element={<SellerSignupPage />} />
        <Route path="/saffronpackaging" element={<SaffronPackaging />} />
        <Route path="/precioussaffron" element={<SaffronComponent/>}/>
        <Route path="/naturalsaffron" element={<SaffronQuality/>}/>
        <Route path="/aboutus" element={<About/>}/>
        <Route path="/ourpartners" element={<OurPartners />}/>
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
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
          element={
            <ProtectedRoute>
              <Cart />
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
    </AuthProvider>
  );
}

export default App;
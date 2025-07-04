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
import Account from './pages/Account';
import OtpVerificationPage from './pages/OtpverifyPage';
import SignupForm from './pages/SignupForm';
import SellerSignupPage from './pages/SellerSignupPage';
import SaffronProductListing from './components/ProductListing';
import SellerDashboard from './components/SellerDashboard';
import SellerLogin from './pages/SellerLogin';

function App() {
  const location = useLocation(); // ✅ Now it's safe

  const hideNavbarRoutes = ['/profile'];
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
        <Route path="/sellerdashboard" element={<SellerDashboard />} />
        <Route path="/sellerlogin" element={<SellerLogin />} />
        <Route path="/productlisting" element={<SaffronProductListing />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='homepage' element={<Home/>}/>
        <Route path='categories' element={<Categories/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='account' element={<Account/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
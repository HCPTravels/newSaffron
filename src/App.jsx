import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AllProducts from './components/Allproduct';
import Contact from './components/Contact';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/partners" element={<OurPartners />} />
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
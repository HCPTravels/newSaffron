import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AllProducts from './components/Allproduct';
import Contact from './components/Contact';
import BeeCanvas from './modal/BeeCanvas';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import Blog from './components/Blog';
import About from './pages/About';
import ContactUs from './pages/Contactus';
import OurPartners from './pages/OurPartners';

function App() {
  

  return (
    <>
      <AuthProvider>
        <BeeCanvas />
        <Navbar />
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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
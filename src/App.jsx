import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AllProducts from './components/Allproduct';
import Contact from './components/Contact';
import BeeCanvas from './modal/BeeCanvas';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
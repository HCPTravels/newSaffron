import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AllProducts from './components/Allproduct'
import Contact from './components/Contact'
import BeeCanvas from './modal/BeeCanvas'

function App() {
  return (
    <>
      <BeeCanvas />
      <Navbar />
      <HeroSection />
      <AllProducts />
      <Contact />
    </>
  )
}

export default App

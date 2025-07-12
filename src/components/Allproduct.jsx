import React from 'react';
import ProductFeatureSection from './FirstProduct';
import Saffron from '../assets/newsaffron.png';
import DriedSaffron from '../assets/driedsaffron.png';
import bowlSaffron from '../assets/bowlSaffron.png';
import image from '../assets/image .png';
import saffron3 from'../assets/saffron3.png'
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const navigate = useNavigate();

  // Helper function to navigate with scroll to top
  const navigateWithScrollToTop = (path) => {
    // Scroll to top first
    window.scrollTo(0, 0);
    
    // Then navigate
    navigate(path);
    
    // Additional scroll to top after navigation (with a small delay)
    // setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 100);
  };
  const data = [
    {
      id: 1,
      title: 'Farm-Fresh, Straight from Source',
      description: 'We work hand-in-hand with saffron farmers in Pampore — the heart of Kashmir\'s saffron cultivation. By partnering directly with local growers who uphold age-old harvesting traditions, we ensure every thread is traceable from field to jar. With no middlemen involved, our saffron retains its purity, quality, and the deep cultural heritage of the Kashmir Valley.',
      image: Saffron,
      features: [
        {
          icon: 'move',
          text: 'Go to details',
          onClick: () => navigateWithScrollToTop('/ourpartners')
        }
      ],
      topMargin: 'mt-[0px]',
    },
    {
      id: 2,
      title: 'Quality You Can See, Smell & Trust',
      description: 'Our saffron journey begins in the lush fields of Pampore, Kashmir, where age-old tradition meets masterful craftsmanship. Each flower is hand-harvested at sunrise, its crimson stigmas delicately separated and shade-dried to preserve essential oils, rich aroma, and deep color.',
      image: DriedSaffron,
      features: [
        {
          icon: 'move',
          text: 'Go to details',
          onClick: () => navigateWithScrollToTop('/aboutus')
        }
      ],
      topMargin: 'mt-[0px]',
    },
    {
      id: 3,
      title: 'Traditional Drying, Naturally Preserved',
      description: 'The saffron harvested in Pampore undergoes a traditional, time-honored process that includes gently drying the delicate stigmas after hand-picking. No artificial heat is used — instead, the drying is done slowly and carefully, preserving the saffron\'s natural oils, rich aroma, and medicinal properties.',
      image: image,
      features: [
        {
          icon: 'move',
          text: 'Go to details',
          onClick: () => navigateWithScrollToTop('/naturalsaffron')
        }
      ],
      topMargin: 'mt-[0px]',
    },
    {
      id: 4,
      title: 'Sealed for Freshness, Packed with Care',
      description: 'Packaging is more than presentation — it\'s protection. While most saffron is sold in plastic or clear glass that allows UV damage and scent contamination, we use UV-blocking metal tins and dark glass jars to preserve aroma and potency. To maintain its rich flavor and strength, saffron should be stored in a cool, dry place away from light and moisture.',
      image: saffron3,
      features: [
        {
          icon: 'move',
          text: 'Go to details',
          onClick: () => navigateWithScrollToTop('/saffronpackaging')
        }
      ],
      topMargin: 'mt-[0px]',
    },
    {
      id: 5,
      title: 'Premium by Nature, Not by Price',
      description: 'It takes 75,000 hand-picked flowers to make just one pound of saffron — a process that demands care, precision, and tradition. We honor that legacy by delivering 100% pure, potent saffron, with no additives or shortcuts. While most brands inflate prices or compromise on quality, we offer honest pricing and uncompromised purity — because you deserve saffron that\'s truly worth every rupee.',
      image: bowlSaffron,
      features: [
        {
          icon: 'move',
          text: 'Go to details',
          onClick: () => navigateWithScrollToTop('/precioussaffron')
        }
      ],
      topMargin: 'mt-[0px]',
    },
  ];
  
  return (
    <>
      {data.map((item) => (
        <div 
          key={item.id} 
          className={`${item.topMargin} ${item.id % 2 !== 0 ? 'pl-8 md:pl-12 lg:pl-16' : ''}`}
        >
          <ProductFeatureSection {...item} />
        </div>
      ))}
    </>
  );
};

export default AllProducts;
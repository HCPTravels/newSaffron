import React from 'react';
import ProductFeatureSection from './FirstProduct';
import Saffron from '../assets/saffron.png'; // Adjust the path as necessary
import DriedSaffron from '../assets/driedsaffron.png'; // Adjust the path as necessary
import bowlSaffron from '../assets/bowlSaffron.png'; // Adjust the path as necessary
import image from '../assets/image .png'; // Adjust the path as necessary
import saffron3 from'../assets/saffron3.png'



 const data = [
    {
      id: 1,
      title: 'Farm-Fresh, Straight from Source',
      description:'We work hand-in-hand with saffron farmers in Pampore — the heart of Kashmir’s saffron cultivation. By partnering directly with local growers who uphold age-old harvesting traditions, we ensure every thread is traceable from field to jar. With no middlemen involved, our saffron retains its purity, quality, and the deep cultural heritage of the Kashmir Valley.',
      image: Saffron,
      features: [
        { icon: 'move', text: 'Know where your saffron comes from.' },
        { icon: 'link', text: 'Explore Our Sourcing' },
      ],
      topMargin: 'mt-[-20px]',
    },
    {
      id: 2,
      title: 'Quality You Can See, Smell & Trust',
      description:'Our saffron journey begins in the lush fields of Pampore, Kashmir, where age-old tradition meets masterful craftsmanship. Each flower is hand-harvested at sunrise, its crimson stigmas delicately separated and shade-dried to preserve essential oils, rich aroma, and deep color. From field to final seal, every step is executed with precision and purity, ensuring only the highest-grade saffron reaches you — full of flavor, fragrance, and wellness benefits.',
      image: DriedSaffron,
      features: [
        { icon: 'move', text: 'Only the top 1% of saffron makes it to you.' },
        { icon: 'link', text: 'See our Quality Standards' },
      ],
      topMargin: 'mt-[-20px]',

    },
    {
      id: 3,
      title: 'Traditional Drying, Naturally Preserved',
      description:'The saffron harvested in Pampore undergoes a traditional, time-honored process that includes gently drying the delicate stigmas after hand-picking. No artificial heat is used — instead, the drying is done slowly and carefully, preserving the saffron’s natural oils, rich aroma, and medicinal properties. These ancient techniques, passed down through generations, ensure that the final product retains its purity, potency, and deep crimson color, making Kashmiri saffron truly exceptional.',
      image: image,
      features: [
        { icon: 'move', text: 'Get full strength and natural flavour in every strand.' },
        { icon: 'link', text: 'Why Drying Matters' },
      ],
      topMargin: 'mt-[-20px]',

    },
    {
        id: 4,
        title: 'Sealed for Freshness, Packed with Care',
        description:'Packaging is more than presentation — it’s protection. While most saffron is sold in plastic or clear glass that allows UV damage and scent contamination, we use UV-blocking metal tins and dark glass jars to preserve aroma and potency. To maintain its rich flavor and strength, saffron should be stored in a cool, dry place away from light and moisture. Every element of our packaging is designed to protect the purity of your saffron from harvest to your kitchen.',
        image: saffron3,
        // imageClass: 'aspect-[4/3] max-h-[280px] object-contain', // 👈 Add this line
        features: [
          { icon: 'move', text: 'Unbox aroma, freshness, and elegance.' },
          { icon: 'link', text: 'View Our Packaging' },
        ],
        topMargin: 'mt-[-20px]',
      },
    {
      id: 5,
      title: 'Premium by Nature, Not by Price',
      description:'It takes 75,000 hand-picked flowers to make just one pound of saffron — a process that demands care, precision, and tradition. We honor that legacy by delivering 100% pure, potent saffron, with no additives or shortcuts. While most brands inflate prices or compromise on quality, we offer honest pricing and uncompromised purity — because you deserve saffron that’s truly worth every rupee.',
      image: bowlSaffron,
      features: [
        { icon: 'move', text: 'Saffron this pure is powerful and precious.' },
        { icon: 'link', text: 'Why It’s Worth It' },
      ],
      topMargin: 'mt-[-20px]',

    },
  ];
  
  const AllProducts = () => {
    return (
      <>
        {data.map((item) => (
          <div key={item.id} className={item.topMargin}>
            <ProductFeatureSection {...item} />
          </div>
        ))}
      </>
    );
  };
  

export default AllProducts;

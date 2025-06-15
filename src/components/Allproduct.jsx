import React from 'react';
import ProductFeatureSection from './FirstProduct';
import Saffron from '../assets/saffron.png'; // Adjust the path as necessary
import DriedSaffron from '../assets/driedSaffron.png'; // Adjust the path as necessary
import bowlSaffron from '../assets/bowlSaffron.png'; // Adjust the path as necessary
import image from '../assets/image .png'; // Adjust the path as necessary



const data = [
    {
      id: 1,
      title: 'Farm-Fresh, Straight from Source',
      description:
        'We partner directly with trusted saffron farmers in Kashmir. No middlemen, no compromise — just pure, traceable saffron from field to jar.',
      image: Saffron,
      features: [
        { icon: 'move', text: 'Know where your saffron comes from.' },
        { icon: 'link', text: 'Explore Our Sourcing' },
      ],
    },
    {
      id: 2,
      title: 'Quality You Can See, Smell & Trust',
      description:
        'Each batch is hand-inspected and lab-tested. We check for color, aroma, moisture & purity — selecting only deep red stigmas, the highest grade.',
      image: DriedSaffron,
      features: [
        { icon: 'move', text: 'Only the top 1% of saffron makes it to you.' },
        { icon: 'link', text: 'See our Quality Standards' },
      ],
    },
    {
      id: 3,
      title: 'Traditional Drying, Naturally Preserved',
      description:
        'Our saffron is shade-dried using ancient methods — no heat, no rush. This keeps natural oils and medicinal properties perfectly intact.',
      image: image,
      features: [
        { icon: 'move', text: 'Get full strength and natural flavour in every strand.' },
        { icon: 'link', text: 'Why Drying Matters' },
      ],
    },
    {
      id: 4,
      title: 'Sealed for Freshness, Packed with Care',
      description:
        'Packed in airtight glass jars or vacuum pouches to protect your saffron from light and air — locking in aroma and potency.',
      image: Saffron,
      features: [
        { icon: 'move', text: 'Unbox aroma, freshness, and elegance.' },
        { icon: 'link', text: 'View Our Packaging' },
      ],
    },
    {
      id: 5,
      title: 'Premium by Nature, Not by Price',
      description:
        'It takes 75,000 flowers to make 1 pound of saffron. That’s why every strand we deliver is 100% pure, powerful, and worth every rupee.',
      image: bowlSaffron,
      features: [
        { icon: 'move', text: 'Saffron this pure is powerful and precious.' },
        { icon: 'link', text: 'Why It’s Worth It' },
      ],
    },
  ];
  

const AllProducts = () => {
  return (
    <>
      {data.map((item) => (
        <ProductFeatureSection key={item.id} {...item} />
      ))}
    </>
  );
};

export default AllProducts;

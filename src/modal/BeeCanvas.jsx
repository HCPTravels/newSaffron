import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BeeModel from './BeeModel';

export default function BeeCanvas() {
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 2]} />
      <BeeModel scrollY={scrollY} />
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}

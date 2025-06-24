import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BeeModel from './BeeModel';
import AnimatedCamera from './AnimatedCamera';

const keyframes = [
  { scroll: 1, x: 422, y: -200 },
  { scroll: 20, x: 437, y: -167 },
  { scroll: 44, x: 251, y: 517 },
  { scroll: 58, x: 0, y: 780 },
  { scroll: 90, x: 0, y: 781 },
  { scroll: 107, x: 176, y: 961 },
  { scroll: 119, x: 379, y: 1051 },
  { scroll: 160, x: 686, y: 1200 },
  { scroll: 204, x: 36, y: 1600 },
  { scroll: 216, x: -44, y: 2050 },
  { scroll: 269, x: -44, y: 2100 },
  { scroll: 289, x: 600, y: 2450 },
  { scroll: 327, x: 309, y: 2600 },
  { scroll: 381, x: -44, y: 3100 },
  { scroll: 399, x: -44, y: 3100 },
  { scroll: 410, x: 223, y: 3300 },
  { scroll: 413, x: 296, y: 3400 },
  { scroll: 423, x: 587, y: 3600 },
];

const easingMap = [
  [1, 20, [0.42, 0.0, 0.58, 1.0]],
  [20, 44, [0.42, 0.0, 0.58, 1.0]],
  [44, 58, [0.6, -0.28, 0.73, 0.04]],
  [58, 90, [0.42, 0.0, 0.58, 1.0]],
  [90, 107, [0.42, 0.0, 0.58, 1.0]],
  [107, 119, [0.42, 0.0, 0.58, 1.0]],
  [119, 160, [0.42, 0.0, 0.58, 1.0]],
  [160, 170, [0.42, 0.0, 0.58, 1.0]],
  [170, 180, [0.42, 0.0, 0.58, 1.0]],
  [180, 190, [0.42, 0.0, 0.58, 1.0]],
  [190, 200, [0.42, 0.0, 0.58, 1.0]],
  [200, 204, [0.42, 0.0, 0.58, 1.0]],
  [216, 269, [0.42, 0.0, 0.58, 1.0]],
  [269, 289, [0.42, 0.0, 0.58, 1.0]],
  [289, 327, [0.42, 0.0, 0.58, 1.0]],
  [327, 381, [0.42, 0.0, 0.58, 1.0]],
  [381, 399, [0.0, 0.0, 1.0, 1.0]],
  [399, 410, [0.0, 0.0, 1.0, 1.0]],
  [410, 413, [0.0, 0.0, 1.0, 1.0]],
  [413, 423, [0.0, 0.0, 1.0, 1.0]],
];

function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function getBezierForScroll(scroll) {
  for (let [from, to, bezier] of easingMap) {
    if (scroll >= from && scroll <= to) return { bezier };
  }
  return { bezier: [0, 0, 1, 1] };
}

// Hook to detect screen size and get dimensions
function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth > 768 && window.innerWidth <= 1024 : false
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024
      });
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Convert desktop coordinates to mobile/tablet coordinates
function convertCoordinatesForDevice(x, y, screenSize) {
  const { width, height, isMobile, isTablet } = screenSize;

  if (isMobile) {
    const baseWidth = 918; // base design width
    const baseHeight = 4000; // approx full scroll height

    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;

    return {
      x: x * scaleX,
      y: y * scaleY
    };
  }

  if (isTablet) {
    const baseWidth = 1200;
    const baseHeight = 4000;

    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;

    return {
      x: x * scaleX,
      y: y * scaleY
    };
  }

  // Desktop: return original coordinates
  return { x, y };
}

export default function BeeCanvas() {
  const scrollYRef = useRef(0);
  const [windowScrollY, setWindowScrollY] = useState(0);
  const [renderPosition, setRenderPosition] = useState({ x: 422, y: -220 });
  const screenSize = useScreenSize();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = (window.scrollY / window.innerHeight) * 100;
      scrollYRef.current = scroll;
      setWindowScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationFrame;
    let currentX = renderPosition.x;
    let currentY = renderPosition.y;

    const animate = () => {
      const scroll = scrollYRef.current;

      // Find keyframe segment
      let kf1 = keyframes[0], kf2 = keyframes[keyframes.length - 1];
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (scroll >= keyframes[i].scroll && scroll <= keyframes[i + 1].scroll) {
          kf1 = keyframes[i];
          kf2 = keyframes[i + 1];
          break;
        }
      }

      const scrollRange = kf2.scroll - kf1.scroll || 1;
      const progress = Math.min(Math.max((scroll - kf1.scroll) / scrollRange, 0), 1);

      const { bezier } = getBezierForScroll(scroll);
      const [p0, p1, p2, p3] = bezier;
      const easedProgress = cubicBezier(progress, p0, p1, p2, p3);

      // Get desktop target position
      const desktopTargetX = kf1.x + (kf2.x - kf1.x) * easedProgress;
      const desktopTargetY = kf1.y + (kf2.y - kf1.y) * easedProgress;

      // Convert coordinates based on device type
      const { x: targetX, y: targetY } = convertCoordinatesForDevice(
        desktopTargetX, 
        desktopTargetY, 
        screenSize
      );

      // Smooth interpolation (lerp with damping)
      const damping = 0.1;
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;

      setRenderPosition({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [screenSize]);

  // Responsive sizing
  const getCanvasSize = () => {
    if (screenSize.isMobile) {
      return {
        width: Math.min(400, screenSize.width * 0.9), // 90% of screen width, max 400px
        height: Math.min(350, screenSize.width * 0.75) // Maintain aspect ratio
      };
    } else if (screenSize.isTablet) {
      return {
        width: Math.min(600, screenSize.width * 0.8),
        height: Math.min(500, screenSize.width * 0.65)
      };
    }
    return { width: 918, height: 783 }; // Desktop size
  };
  const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
  
  // Calculate final position ensuring the bee stays in viewport
  const finalX = Math.max(0, Math.min(screenSize.width - canvasWidth, renderPosition.x));
  let viewportY = renderPosition.y - windowScrollY;

  if (screenSize.isMobile) {
    const maxY = screenSize.height - canvasHeight - 30;
    const minY = 100;
    viewportY = Math.max(minY, Math.min(maxY, viewportY));
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: `${viewportY}px`,
        left: `${finalX}px`,
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        pointerEvents: 'none',
        zIndex: 40,
        // Debugging - uncomment to see canvas boundaries
        // border: screenSize.isMobile ? '2px solid red' : '1px solid blue',
      }}
    >
      <Canvas 
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }} 
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        camera={{ 
          position: [0, 0, 5],
          fov: screenSize.isMobile ? 70 : screenSize.isTablet ? 60 : 45
        }}
      >
        <AnimatedCamera scrollY={scrollYRef} />
        <ambientLight intensity={screenSize.isMobile ? 1.5 : 1.2} />
        <directionalLight 
          position={[3, 5, 2]} 
          intensity={screenSize.isMobile ? 1.2 : 1} 
        />
        <BeeModel 
          scrollY={scrollYRef} 
          screenSize={screenSize}
        />
      </Canvas>
    </div>
  );
}
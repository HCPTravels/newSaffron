import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BeeModel from './BeeModel';
import AnimatedCamera from './AnimatedCamera';

const desktopKeyframes = [
  { scroll: 1, x: 550, y: -150 },
  { scroll: 20, x: 437, y: -50 },
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
  { scroll: 410, x: 223, y: 3300 },
  { scroll: 423, x: 587, y: 3600 },
];
const mobileKeyframes = [
  // ZIG-ZAG: LEFT -> RIGHT -> LEFT
  { scroll: 1, x: 70, y: 0 },
  { scroll: 20, x: 50, y: 150 },
  { scroll: 44, x: 90, y: 400 },
  { scroll: 58, x: -100, y: 600 },
  { scroll: 90, x: -100, y: 600 },

  // RIGHT — smooth small Y increase
  { scroll: 107, x: 60, y: 610 },
  { scroll: 119, x: 100, y: 620 },
  { scroll: 127, x: 100, y: 630 },
  { scroll: 135, x: 100, y: 640 },

  // LEFT
  { scroll: 140, x: 50, y: 660 },
  { scroll: 145, x: 40, y: 680 },
  { scroll: 150, x: 30, y: 700 },
  { scroll: 155, x: 30, y: 720 },

  // RIGHT
  { scroll: 160, x: 120, y: 680 },

  // LEFT
  { scroll: 180, x: -100, y: 700 },

  // RIGHT
  { scroll: 200, x: 130, y: 720 },

  // LEFT
  { scroll: 220, x: -110, y: 740 },

  // RIGHT
  { scroll: 240, x: 140, y: 745 },
  { scroll: 245, x: 120, y: 762 },
  { scroll: 250, x: 110, y: 764 },
  { scroll: 255, x: 100, y: 766 },

  // LEFT
  { scroll: 260, x: -100, y: 770 },

  // RIGHT
  { scroll: 265, x: 130, y: 774 },

  // LEFT
  { scroll: 270, x: 100, y: 820 },
  { scroll: 290, x: 70, y: 850 },
  { scroll: 310, x: 30, y: 900 },
  { scroll: 320, x: 25, y: 930 },

  { scroll: 320, x: 20, y: 950 },
  { scroll: 325, x: 10, y: 980 },
  { scroll: 330, x: -20, y: 1000 },
  // { scroll: 310, x: 30, y: 900 },
  // // RIGHT
  // { scroll: 275, x: 140, y: 790 },
];
const easingMap = [[1, 423, [0.42, 0.0, 0.58, 1.0]]];

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

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth > 768 && window.innerWidth <= 1024 : false,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

export default function BeeCanvas() {
  const scrollYRef = useRef(0);
  const [windowScrollY, setWindowScrollY] = useState(0);
  const screenSize = useScreenSize();
  const [debugInfo, setDebugInfo] = useState({ scroll: 0, x: 0, y: 0 });

  const keyframes = screenSize.isMobile ? mobileKeyframes : desktopKeyframes;
  const initialKeyframe = keyframes[0];

  const [renderPosition, setRenderPosition] = useState({
    x: initialKeyframe.x,
    y: initialKeyframe.y,
  });

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
    let currentX = initialKeyframe.x;
    let currentY = initialKeyframe.y;

    const animate = () => {
      const scroll = scrollYRef.current;

      let kf1 = keyframes[0],
        kf2 = keyframes[keyframes.length - 1];
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

      const targetX = kf1.x + (kf2.x - kf1.x) * easedProgress;
      const targetY = kf1.y + (kf2.y - kf1.y) * easedProgress;

      const damping = screenSize.isMobile ? 0.25 : 0.1;
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;

      setRenderPosition({ x: currentX, y: currentY });

      // Show on-screen debug for mobile
      if (screenSize.isMobile) {
        setDebugInfo({
          scroll: scroll.toFixed(1),
          x: currentX.toFixed(1),
          y: currentY.toFixed(1),
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [screenSize]);

  const getCanvasSize = () => {
    if (screenSize.isMobile) {
      return {
        width: Math.min(400, screenSize.width * 0.9),
        height: Math.min(350, screenSize.width * 0.75),
      };
    } else if (screenSize.isTablet) {
      return {
        width: Math.min(600, screenSize.width * 0.8),
        height: Math.min(500, screenSize.width * 0.65),
      };
    }
    return { width: 918, height: 783 };
  };

  const { width: canvasWidth, height: canvasHeight } = getCanvasSize();
  const finalX = renderPosition.x;
  let viewportY = renderPosition.y - windowScrollY;

  if (screenSize.isMobile) {
    const maxY = screenSize.height - canvasHeight - 30;
    const minY = 100;
    viewportY = Math.max(minY, Math.min(maxY, viewportY));
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: `${viewportY}px`,
          left: `${finalX}px`,
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
          camera={{
            position: [0, 0, 5],
            fov: screenSize.isMobile ? 70 : screenSize.isTablet ? 60 : 45,
          }}
        >
          <AnimatedCamera scrollY={scrollYRef} />
          <ambientLight intensity={screenSize.isMobile ? 1.5 : 1.2} />
          <directionalLight position={[3, 5, 2]} intensity={screenSize.isMobile ? 1.2 : 1} />
          <BeeModel scrollY={scrollYRef} screenSize={screenSize} />
        </Canvas>
      </div>

      {screenSize.isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: 9999,
            fontFamily: 'monospace',
            
          }}
        >
          <div>📱 Scroll: {debugInfo.scroll}%</div>
          <div>🐝 X: {debugInfo.x}px</div>
          <div>🐝 Y: {debugInfo.y}px</div>
        </div>
      )}
    </>
  );
}
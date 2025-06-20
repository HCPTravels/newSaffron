import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { cameraKeyframes } from './CameraController';

// Cubic bezier easing
function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return (
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
}

// Easing map for camera
const cameraEasingMap = [
  [1, 20, [0.42, 0.00, 0.58, 1.00]],
  [20, 36, [0.42, 0.00, 0.58, 1.00]],
  [36, 57, [0.42, 0.00, 0.58, 1.00]],
  [57, 80, [0.42, 0.00, 0.58, 1.00]],
  [80, 104, [0.60, -0.28, 0.73, 0.04]],
  [104, 108, [0.42, 0.00, 0.58, 1.00]],
  [108, 120, [0.42, 0.00, 0.58, 1.00]],
  [120, 139, [0.42, 0.00, 0.58, 1.00]],
  [139, 160, [0.42, 0.00, 0.58, 1.00]],
  [160, 204, [0.42, 0.00, 0.58, 1.00]],
  [204, 216, [0.42, 0.00, 0.58, 1.00]],
  [216, 269, [0.42, 0.00, 0.58, 1.00]],
  [269, 289, [0.42, 0.00, 0.58, 1.00]],
  [289, 328, [0.42, 0.00, 0.58, 1.00]],
  [328, 353, [0.42, 0.00, 0.58, 1.00]],
  [353, 366, [0.42, 0.00, 0.58, 1.00]],
  [366, 375, [0.42, 0.00, 0.58, 1.00]],
  [375, 381, [0.42, 0.00, 0.58, 1.00]],
];

// Get easing bezier for scroll range
function getCameraBezier(scroll) {
  for (let [from, to, bezier] of cameraEasingMap) {
    if (scroll >= from && scroll <= to) return bezier;
  }
  return [0, 0, 1, 1]; // linear fallback
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolate(scroll, keyframes, key) {
  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i], b = keyframes[i + 1];
    if (scroll >= a.scroll && scroll <= b.scroll) {
      const progress = (scroll - a.scroll) / (b.scroll - a.scroll);
      const [p0, p1, p2, p3] = getCameraBezier(scroll);
      const eased = cubicBezier(progress, p0, p1, p2, p3);
      return lerp(a[key], b[key], eased);
    }
  }
  return keyframes[keyframes.length - 1][key];
}

export default function AnimatedCamera({ scrollY }) {
  const camRef = useRef();

  useFrame(() => {
    const scroll = scrollY.current;

    const dist = interpolate(scroll, cameraKeyframes, 'distance');
    const elev = interpolate(scroll, cameraKeyframes, 'elevation');
    const azim = interpolate(scroll, cameraKeyframes, 'azimuthal');

    const phi = (90 - elev) * (Math.PI / 180);
    const theta = (azim % 360) * (Math.PI / 180);

    const x = dist * Math.sin(phi) * Math.cos(theta);
    const y = dist * Math.cos(phi);
    const z = dist * Math.sin(phi) * Math.sin(theta);

    camRef.current.position.set(x, y, z);
    camRef.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={50} near={0.01} far={1000} />;
}

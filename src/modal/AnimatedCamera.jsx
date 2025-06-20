import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { cameraKeyframes } from './CameraController';

function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t;
  return (
    3 * u * u * t * p1 +
    3 * u * t * t * p2 +
    t * t * t * p3
  );
}

const cameraEasingMap = [ /* your existing map */ ];

function getCameraBezier(scroll) {
  for (let [from, to, bezier] of cameraEasingMap) {
    if (scroll >= from && scroll <= to) return bezier;
  }
  return [0, 0, 1, 1]; // linear
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function damp(current, target, lambda, delta) {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
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

  const current = useRef({
    x: 0, y: 0, z: 0
  });

  useFrame((state, delta) => {
    const scroll = scrollY.current;

    const dist = interpolate(scroll, cameraKeyframes, 'distance');
    const elev = interpolate(scroll, cameraKeyframes, 'elevation');
    const azim = interpolate(scroll, cameraKeyframes, 'azimuthal');

    const phi = (90 - elev) * (Math.PI / 180);
    const theta = (azim % 360) * (Math.PI / 180);

    const targetX = dist * Math.sin(phi) * Math.cos(theta);
    const targetY = dist * Math.cos(phi);
    const targetZ = dist * Math.sin(phi) * Math.sin(theta);

    // Smoothly interpolate position
    current.current.x = damp(current.current.x, targetX, 6, delta);
    current.current.y = damp(current.current.y, targetY, 6, delta);
    current.current.z = damp(current.current.z, targetZ, 6, delta);

    camRef.current.position.set(
      current.current.x,
      current.current.y,
      current.current.z
    );
    camRef.current.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={camRef} makeDefault fov={50} near={0.01} far={1000} />;
}

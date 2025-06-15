import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function BeeModel({ scrollY }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF('/bee.glb');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    actions['_bee_idle']?.play();
    actions['_bee_hover']?.play();

    if (groupRef.current) {
      groupRef.current.position.set(3, 1, -1);
      groupRef.current.rotation.set(0.4, -1.5, -0.2);
    }
  }, [actions]);

  useFrame(() => {
    const scroll = scrollY.current;

    if (groupRef.current) {
      let x, y, rotY;

      if (scroll < 970) {
        // Move left from 3 to -2
        x = 3 - (scroll / 200);
        rotY = -1.5;
      } else if (scroll >= 970 && scroll < 1050) {
        // Dip further left: -2 to -3.5
        const progress = (scroll - 970) / 80;
        x = -2 - progress * 1.5;
        rotY = -1.2;
      } else {
        // Move right from -3.5 to 3
        x = -3.5 + ((scroll - 850) / 200);

        // Smoothly rotate head towards Y-axis
        const progress = Math.min((scroll - 850) / 300, 1); // clamp between 0 and 1
        rotY = -1.5 + progress * (Math.PI / 2); // from -1.5 to ≈0.07 (forward)
      }

      y = 1 + Math.sin(scroll / 100) * 1;

      groupRef.current.position.set(x, y, -1);
      groupRef.current.rotation.y = rotY;
    }
  });

  return (
    <group ref={groupRef} scale={0.1}>
      <primitive object={scene} />
    </group>
  );
}

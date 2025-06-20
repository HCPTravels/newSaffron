import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function BeeModel({ scrollY }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/bee.glb'); // Adjust path if needed
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play specific animations if they exist
    if (actions["_bee_hover"]) {
      actions["_bee_hover"].reset().play();
    }

    if (actions["_bee_idle"]) {
      actions["_bee_idle"].reset().play();
    }
  }, [actions]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        position={[0, 0, 0]}
        rotation={[0.1, -1, 0]}
        scale={0.06}
      />
    </group>
  );
}

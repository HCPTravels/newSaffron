import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function BeeModel({ scrollY, screenSize }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/bee.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play specific animations if they exist
    if (actions["_bee_hover"]) {
      actions["_bee_hover"].reset().play();
    }

    if (actions["_bee_idle"]) {
      actions["_bee_idle"].reset().play();
    }

    // Log available animations for debugging
    console.log('Available animations:', Object.keys(actions));
  }, [actions]);

  // Dynamic scaling based on screen size
  const getModelScale = () => {
    if (screenSize.isMobile) {
      // Larger scale for mobile to make bee more visible
      return screenSize.width < 400 ? 0.08 : 0.1;
    } else if (screenSize.isTablet) {
      return 0.075;
    }
    return 0.06; // Desktop scale
  };

  // Adjust position based on screen size
  const getModelPosition = () => {
    if (screenSize.isMobile) {
      return [0, -0.3, 0]; // Slight vertical adjustment for mobile
    } else if (screenSize.isTablet) {
      return [0, -0.15, 0];
    }
    return [0, 0, 0]; // Desktop position
  };

  const scale = getModelScale();
  const position = getModelPosition();

  return (
    <group ref={group}>
      <primitive
        object={scene}
        position={position}
        rotation={[0.1, -1, 0]}
        scale={scale}
      />
    </group>
  );
}
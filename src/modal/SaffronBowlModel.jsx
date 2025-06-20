// components/SaffronBowlModel.jsx
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader, MeshStandardMaterial } from 'three';

export default function SaffronBowlModel({ position = [0, 0, 0], scale = 1 }) {
  const model = useLoader(OBJLoader, '/bowlofsaffron/Pbr/base.obj');

  const [diffuse, normal, roughness, metallic, pbr] = useLoader(TextureLoader, [
    '/bowlofsaffron/Pbr/texture_diffuse.png',
    '/bowlofsaffron/Pbr/texture_normal.png',
    '/bowlofsaffron/Pbr/texture_roughness.png',
    '/bowlofsaffron/Pbr/texture_metallic.png',
    '/bowlofsaffron/Pbr/texture_pbr.png',
  ]);

  // Use PBR texture as a second color map or blend if needed
  const material = new MeshStandardMaterial({
    map: diffuse, // you can swap this with `pbr` if preferred
    normalMap: normal,
    roughnessMap: roughness,
    metalnessMap: metallic,
    metalness: 1,
    roughness: 1,
  });

  model.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      object={model}
      position={position}
      scale={scale}
      rotation={[-0.3, 0, 0]}
    />
  );
}

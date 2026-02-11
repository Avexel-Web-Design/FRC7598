import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./constellationData";

const Globe = ({ rotationY = 0 }) => {
  // Load the NASA Blue Marble earth texture
  const earthTexture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");

  // Configure texture for best quality
  useMemo(() => {
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = 8;
  }, [earthTexture]);

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Main globe sphere with Earth texture */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

export default Globe;

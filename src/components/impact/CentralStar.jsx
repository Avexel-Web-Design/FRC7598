import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

// Build a 5-pointed star Shape
function createStarShape(outerRadius = 1, innerRadius = 0.4, points = 5) {
  const shape = new THREE.Shape();
  const step = Math.PI / points;

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
}

const CENTRAL_ALTITUDE = 0.02;

const CentralStar = ({ phaseInfo = { phase: 0, miZoom: 0, globeZoom: 0, finalZoom: 0 } }) => {
  const groupRef = useRef();

  const basePosition = useMemo(
    () => latLngToVector3(42.5248, -83.5363, GLOBE_RADIUS, CENTRAL_ALTITUDE),
    []
  );

  const starShape = useMemo(() => createStarShape(1, 0.42, 5), []);

  // Scale: tiny at Michigan close-up, grows at globe view
  const sizeFactor = 0.04 + 0.96 * phaseInfo.globeZoom;
  const starScale = sizeFactor * 0.06;

  const finalZoom = phaseInfo.finalZoom || 0;

  // Shift color toward white as camera zooms in
  const brighten = Math.max(0, (finalZoom - 0.3) / 0.7);
  const starColor = brighten > 0
    ? new THREE.Color("#d4a843").lerp(new THREE.Color("#ffffff"), brighten)
    : new THREE.Color("#d4a843");

  // Billboard: always face the camera
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group position={basePosition}>
      <group ref={groupRef}>
        {/* Star shape — stays visible, camera zooms into it */}
        <mesh scale={starScale}>
          <shapeGeometry args={[starShape]} />
          <meshBasicMaterial
            color={starColor}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        {/* Tiny circle to cover the center seam artifact */}
        <mesh scale={starScale * 0.15} renderOrder={1}>
          <circleGeometry args={[1, 16]} />
          <meshBasicMaterial
            color={starColor}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};

export default CentralStar;

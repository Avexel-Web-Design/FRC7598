import React, { useMemo } from "react";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./constellationData";
import LAND_POLYGONS from "./landPolygons";

// Convert [lng, lat] to 3D position on globe surface
function lngLatTo3D(lng, lat, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Build a single BufferGeometry containing all continent outline segments
function buildContinentLines(radius) {
  const points = [];

  for (const ring of LAND_POLYGONS) {
    for (let i = 0; i < ring.length - 1; i++) {
      const [lng1, lat1] = ring[i];
      const [lng2, lat2] = ring[i + 1];

      // Skip segments that wrap around the antimeridian (long jumps)
      if (Math.abs(lng2 - lng1) > 90) continue;

      const p1 = lngLatTo3D(lng1, lat1, radius);
      const p2 = lngLatTo3D(lng2, lat2, radius);
      points.push(p1, p2);
    }
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
}

const Globe = ({ rotationY = 0 }) => {
  const continentGeometry = useMemo(
    () => buildContinentLines(GLOBE_RADIUS * 1.002),
    []
  );

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Solid black sphere base */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial color="#08080f" />
      </mesh>

      {/* Purple continent outlines */}
      <lineSegments geometry={continentGeometry}>
        <lineBasicMaterial color="#8B5CF6" linewidth={1.5} transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
};

export default Globe;

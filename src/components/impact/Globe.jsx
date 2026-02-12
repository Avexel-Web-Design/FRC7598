import React, { useMemo } from "react";
import * as THREE from "three";
import { GLOBE_RADIUS } from "./constellationData";
import LAND_POLYGONS from "./landPolygons";
import COUNTRY_BORDERS from "./countryBorders";
import STATE_BORDERS from "./stateBorders";
import LAKE_LINES from "./lakeLines";

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

// Build line segments from an array of polylines
function buildLineSegments(polylines, radius) {
  const points = [];

  for (const line of polylines) {
    for (let i = 0; i < line.length - 1; i++) {
      const [lng1, lat1] = line[i];
      const [lng2, lat2] = line[i + 1];

      if (Math.abs(lng2 - lng1) > 90) continue;

      const p1 = lngLatTo3D(lng1, lat1, radius);
      const p2 = lngLatTo3D(lng2, lat2, radius);
      points.push(p1, p2);
    }
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

const Globe = ({ rotationY = 0 }) => {
  const continentGeometry = useMemo(
    () => buildLineSegments(LAND_POLYGONS, GLOBE_RADIUS * 1.002),
    []
  );

  const countryBorderGeometry = useMemo(
    () => buildLineSegments(COUNTRY_BORDERS, GLOBE_RADIUS * 1.001),
    []
  );

  const stateBorderGeometry = useMemo(
    () => buildLineSegments(STATE_BORDERS, GLOBE_RADIUS * 1.001),
    []
  );

  const lakeGeometry = useMemo(
    () => buildLineSegments(LAKE_LINES, GLOBE_RADIUS * 1.002),
    []
  );

  return (
    <group rotation={[0, rotationY, 0]}>
      {/* Solid black sphere base (ocean) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshBasicMaterial color="#08080f" />
      </mesh>

      {/* Very faint state/province borders */}
      <lineSegments geometry={stateBorderGeometry}>
        <lineBasicMaterial
          color="#7c5cbf"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>

      {/* Faint purple country borders — more visible than states */}
      <lineSegments geometry={countryBorderGeometry}>
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>

      {/* Purple continent/coastline outlines on top */}
      <lineSegments geometry={continentGeometry}>
        <lineBasicMaterial color="#8B5CF6" linewidth={1.5} transparent opacity={0.85} />
      </lineSegments>

      {/* Great Lakes coastlines — same style as continent outlines */}
      <lineSegments geometry={lakeGeometry}>
        <lineBasicMaterial color="#8B5CF6" linewidth={1.5} transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
};

export default Globe;

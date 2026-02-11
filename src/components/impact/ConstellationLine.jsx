import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { latLngToVector3, GLOBE_RADIUS } from "./constellationData";

const ARC_SEGMENTS = 80;
// How high above the globe surface the arc peaks (proportional to distance)
const ARC_HEIGHT_FACTOR = 0.15;

const ConstellationLine = ({
  startLat,
  startLng,
  endLat,
  endLng,
  drawProgress = 0,
  color = "#d3b840",
  pulseEnabled = false,
}) => {
  const lineRef = useRef();
  const materialRef = useRef();

  // Build a great-circle arc from start to end, elevated above the globe
  const positions = useMemo(() => {
    const startVec = latLngToVector3(startLat, startLng, GLOBE_RADIUS, 0.06);
    const endVec = latLngToVector3(endLat, endLng, GLOBE_RADIUS, 0.06);

    // Angular distance between the two points
    const angle = startVec.angleTo(endVec);
    const arcHeight = GLOBE_RADIUS * ARC_HEIGHT_FACTOR * (angle / Math.PI);

    const arr = new Float32Array((ARC_SEGMENTS + 1) * 3);

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      // Spherical interpolation (great circle path)
      const point = new THREE.Vector3().copy(startVec).lerp(endVec, t).normalize();

      // Elevation: parabolic arc peaking at midpoint
      const elevation = GLOBE_RADIUS + 0.06 + arcHeight * 4.0 * t * (1 - t);
      point.multiplyScalar(elevation);

      arr[i * 3] = point.x;
      arr[i * 3 + 1] = point.y;
      arr[i * 3 + 2] = point.z;
    }

    return arr;
  }, [startLat, startLng, endLat, endLng]);

  useFrame((state) => {
    if (!lineRef.current) return;

    const geom = lineRef.current.geometry;

    // Animate draw range
    const vertexCount = Math.floor(drawProgress * (ARC_SEGMENTS + 1));
    geom.setDrawRange(0, Math.max(0, vertexCount));

    // Material opacity
    if (materialRef.current) {
      materialRef.current.opacity = Math.min(1, drawProgress * 2.5) * 0.55;

      // Pulse when complete
      if (pulseEnabled && drawProgress >= 1.0) {
        const t = state.clock.getElapsedTime();
        materialRef.current.opacity =
          0.25 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.5));
      }
    }
  });

  const lineColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={ARC_SEGMENTS + 1}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={lineColor}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
};

export default React.memo(ConstellationLine);
